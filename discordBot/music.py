import typing as t
import wavelink
import discord 
from discord.ext import commands
import re 
import sys
import datetime as dt
sys.path.append("../database")
import db


class AlreadyConnectedToChannel(commands.CommandError):
    pass

class NoVoiceChannel(commands.CommandError):
    pass

class QueueIsEmpty(commands.CommandError):
    pass

class NoTracksFound(commands.CommandError):
    pass

class PlayerIsAlreadyPlaying(commands.CommandError):
    pass

class NoMoreTracks(commands.CommandError):
    pass

class NoValidRepeatMode(commands.CommandError):
    pass


#Regex matches youtube URL
URL_REGEX = r"(?i)\b((?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'\".,<>?«»“”‘’]))"
OPTIONS = {
    "1️⃣": 0,
    "2⃣": 1,
    "3⃣": 2,
    "4⃣": 3,
    "5⃣": 4,
}

def setup(bot):                         #Adds this file as cog to the main bot
    bot.add_cog(Music(bot))


class Player(wavelink.Player):                  
    def __init__(self, *args, **kwargs):                        #Constructor for the wavelink player
        super().__init__(*args, **kwargs)
        self.queue_position = 1
        
    async def connect(self, ctx, channel=None):                 #Tries and connects to target channel
        if self.is_connected:                                   
            raise AlreadyConnectedToChannel
        
        if(channel :=getattr(ctx.author.voice, "channel", channel)) is None:            #Checks if command invoker is in a voicechannel
            raise NoVoiceChannel
        
        await super().connect(channel.id)               #otherwise connects super(the bot) to the channel
        return channel

        
    async def advance(self, track):                                                    #Advances to the next track unless queue is empty
        if track is not None:
            await self.play(track)

        
    async def add_tracks(self, ctx, tracks):
        if isinstance(tracks, wavelink.TrackPlaylist):        

            for track in tracks.tracks:
                db.add_tracks_sync(ctx.guild.id, track, track.uri)
            await ctx.send("Added playlist to queue")
            if not self.is_playing: 
                await self.play(tracks.tracks[0])
                
        else:
            if isinstance(tracks, (str, list, tuple)):
                tracks = tracks[0]
            db.add_tracks_sync(ctx.guild.id, tracks, tracks.uri)
            await ctx.send(f"Added {tracks.title} to Queue")
            if not self.is_playing: 
                await self.play(tracks)

    async def choose_track(self, ctx, tracks):                  #Function to choose out of 5 songs dispalyed in an embed
        def _check(r, u):
            return(
                r.emoji in OPTIONS.keys()
                and u == ctx.author
                and r.message.id == msg.id
            )
        
        embed = discord.Embed(
            title = "Choose a song",
            description = (
                "\n".join(
                    f"**{i+1}.**{t.title} ({t.length//60000}:{str(t.length%60).zfill(2)})"              #DISGUSTING        first takes number of track +1, then title, length divided by 60k because its in microseconds, zfill adds zeroes at the end until it is mm:ss format
                    for i, t in enumerate(tracks[:5])
                )
                ),
            color=ctx.author.color,
            timestamp=dt.datetime.utcnow()
        )
        embed.set_author(name="Query Results")                                                                  #Embed formatting
        embed.set_footer(text=f"Invoked by {ctx.author.display_name}", icon_url=ctx.author.avatar_url)
        
        msg = await ctx.send(embed=embed)
        
        for emoji in list(OPTIONS.keys())[:min(len(tracks),len(OPTIONS))]:                                  #Adds all emojis from enum as reaction
            await msg.add_reaction(emoji)
            
        try:
            reaction, _ = await self.bot.wait_for("reaction_add",timeout=30, check=_check)                  #Waits for user to choose a reaction and therefore track
        except asyncio.TimeoutError:
            await msg.delete()
            await ctx.message.delete()
        else:
            await msg.delete()
            return tracks[OPTIONS[reaction.emoji]]       
        

class Music(commands.Cog, wavelink.WavelinkMixin):

    def __init__(self, bot):
        self.bot = bot
        self.wavelink = wavelink.Client(bot=bot)                            
        self.bot.loop.create_task(self.start_nodes())

    @wavelink.WavelinkMixin.listener()                                          #Checks if node is ready to play music
    async def on_node_ready(self, node):
        await db.clear_all_tracks()
        print(f"Wavelink node {node.identifier} ready.")
        
    @wavelink.WavelinkMixin.listener("on_track_stuck")  
    @wavelink.WavelinkMixin.listener("on_track_end")
    @wavelink.WavelinkMixin.listener("on_track_exception")
    async def on_player_stop(self, node, payload):   
        track = db.get_next_track_sync(payload.player.guild_id, payload.player.queue_position)                                   #ALAAAARM
        if track is not None:
            track = track[0]
            if not re.match(URL_REGEX, track):
                track = f"ytsearch:{track}"
            track = await self.wavelink.get_tracks(track)
            await payload.player.advance(track[0])
            payload.player.queue_position += 1
            await db.update_position(payload.player.guild_id, payload.player.queue_position)
        else:
            await db.clear_tracks(payload.player.guild_id)                                                                     #ALAAAARM
        
            await payload.player.stop()
    
    def get_player(self, obj):                                                  
        if isinstance(obj, commands.Context):
            return self.wavelink.get_player(obj.guild.id, cls=Player, context=obj)
        elif isinstance(obj, discord.Guild):
            return self.wavelink.get_player(obj.id, cls=Player)


    
    async def start_nodes(self):
        await self.bot.wait_until_ready()

        nodes = {
            "MAIN":{
                "host":"127.0.0.1",
                "port": 2333,
                "rest_uri":"http://127.0.0.1:2333",
                "password":"youshallnotpass",
                "identifier":"MAIN",
                "region":"europe"
            }
        }
        
        for node in nodes.values():
            await self.wavelink.initiate_node(**node)

    @commands.command(name="connect", aliases=["join"], brief="Connects the bot to a channel", description="Connects the bot to the specified channel. If no channel is specified, the bot will join the invokers channel. Usage: 'join [channel]' where channel is optional")
    async def connect_command(self, ctx, *, channel: t.Optional[discord.VoiceChannel]):
        player = self.get_player(ctx)
        channel = await player.connect(ctx, channel)
        if channel is None:
            raise NoVoiceChannel
        await ctx.send(f"Joined {channel.name}")

    @commands.command(name="play")
    async def play_command(self, ctx, *, query: t.Optional[str]):
        player = self.get_player(ctx)
        if not player.is_connected:
            await player.connect(ctx)

        query = query.strip("<>")
        if not re.match(URL_REGEX, query):
            query = f"ytsearch:{query}"    
        
        for _ in range(3):    
            track = await self.wavelink.get_tracks(query)
            if track is not None:
                break
            if _ == 3:
                await ctx.send("No matches found")
    
        await player.add_tracks(ctx, track)
    
    @commands.command(name="search", aliases=["s"])
    async def search_command(self, ctx, *, query:t.Optional[str]):
        player = self.get_player(ctx)

        if not re.match(URL_REGEX, query):
            query = f"ytsearch:{query}"  
        tracks = await self.wavelink.get_tracks(query)
        
        track = await player.choose_track(ctx, tracks)
        if not player.is_connected:
            await player.connect(ctx)
        await player.add_tracks(ctx, track)
       
        
    @commands.command(name="stop")
    async def stop_command(self, ctx):
        player = self.get_player(ctx)
        await db.clear_tracks(ctx.guild.id)
        await player.stop()
        await ctx.send("Playback stopped")
    
    @commands.command(name="skip")
    async def skip_command(self, ctx):
        player = self.get_player(ctx)
        await player.stop()
        await ctx.send("Skipping...")
        
    @commands.command(name="shuffle")
    async def shuffle_command(self, ctx):
        await db.shuffle_queue(ctx.guild.id)
        await ctx.send("Queue shuffled!")

    
    @commands.command(name="queue", aliases=["q"])
    async def queue_command(self, ctx):
        embedVar = discord.Embed(title="Queue", color=ctx.author.color)
        player = self.get_player(ctx)
        pos = player.queue_position
        currentTrack = await db.get_next_track(ctx.guild.id, pos - 1)
        if currentTrack is None:
            raise QueueIsEmpty
        embedVar.add_field(name="Currently Playing:",value=currentTrack[0], inline=False)
        trackList = ""
        for i in range(10):
            track = await db.get_next_track(ctx.guild.id, pos + i)
            
            if track is not None:
                trackList = f"{trackList} \n {track[0]}"
                #await ctx.send(f"{i}: {track}")
                
        embedVar.add_field(name="Next Up:",value=trackList, inline=False)
        await ctx.send(embed=embedVar)
        
    @commands.command(name="clear")
    async def clear_command(self, ctx):
        await db.clear_tracks(ctx.guild.id)
        player = self.get_player(ctx)
        await player.stop()
        await ctx.send("Queue cleared!")
        
    @commands.command(name="jump")
    async def jump_command(self, ctx, timestamp):
        player = self.get_player(ctx)
        await player.seek(int(timestamp)*1000)
        await ctx.send(f"Jumped to {timestamp} seconds")
        
        
        
    @connect_command.error
    async def connect_command_error(self, ctx, exc):
        if isinstance(exc, AlreadyConnectedToChannel):
            await ctx.send("Already connected to a voice channel.")
        elif isinstance(exc, NoVoiceChannel):
            await ctx.send("No Voice channel found")
    
    @play_command.error
    async def play_command_error(self, ctx, exc):
        if isinstance(exc, QueueIsEmpty):
            await ctx.send("No songs to play as the queue is empty.")
        elif isinstance(exc, NoVoiceChannel):
            await ctx.send("No suitable voice channel was provided.")
            
    @skip_command.error
    async def skip_command_error(self, ctx, exc):
        if isinstance(exc, NoMoreTracks):
            await ctx.send("No more tracks in queue.")
        if isinstance(exc, QueueIsEmpty):
            await ctx.send("Queue is empty.")
            
    @queue_command.error
    async def queue_command_error(self, ctx, exc):
        if isinstance(exc, QueueIsEmpty):
            await ctx.send("Queue is Empty")
            