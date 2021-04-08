import typing as t
import wavelink
import discord 
from discord.ext import commands
import re 
import sys
import datetime as dt
import asyncio

sys.path.append("../database")      #Neccessary to load the db.py file from database folder
import db


class AlreadyConnectedToChannel(commands.CommandError):     #Custom Errors
    pass

class NoVoiceChannel(commands.CommandError):
    pass

class NotPlaying(commands.CommandError):
    pass

class QueueIsEmpty(commands.CommandError):
    pass

class NoTracksFound(commands.CommandError):
    pass

class PlayerIsAlreadyPlaying(commands.CommandError):
    pass

class NoMoreTracks(commands.CommandError):
    pass



#Regex to match youtube URL
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
    
    async def teardown(self):                  ##Disconnect function
        try:
            await self.destroy()
        except KeyError:
            pass

        
    async def advance(self, track):           #Advances to the next track unless queue is empty
        if track is not None:
            await self.play(track)

        
    async def add_tracks(self, ctx, tracks):            #Adds track to the database
        if isinstance(tracks, wavelink.TrackPlaylist):          #Checks if the "track" is a playlist and if so adds each track it contains to the database
            for track in tracks.tracks:
                db.add_tracks_sync(ctx.guild.id, track, track.uri)
            await ctx.send("Added playlist to queue")
            # if not self.is_playing: 
            #     await self.play(tracks.tracks[0])
                
        else:                                               #If it is not a playlist it will add a single track to the database
            if isinstance(tracks, (str, list, tuple)):
                tracks = tracks[0]
            db.add_tracks_sync(ctx.guild.id, tracks, tracks.uri)
            await ctx.send(f"Added {tracks.title} to Queue")
            # if not self.is_playing: 
            #     await self.play(tracks)

    async def choose_track(self, ctx, tracks):                  #Function to choose out of 5 songs dispalyed in a discord-embed
        def _check(r, u):                                       #Checks if the added emote is one of the 5 specified in OPTIONS
            return(
                r.emoji in OPTIONS.keys()
                and u == ctx.author
                and r.message.id == msg.id
            )
        
        embed = discord.Embed(                              #Discord embed and formatting 
            title = "Choose a song",
            description = (
                "\n".join(
                    f"**{i+1}.**{t.title} ({t.length//60000}:{str(t.length%60).zfill(2)})"     #Formats each line in a way to identify the song you searched for        
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
            reaction, _ = await self.bot.wait_for("reaction_add",timeout=30, check=_check)  #Waits for an user to react with one of the specified emotes
        except asyncio.TimeoutError:                #AFter 30 seconds it just returns the first track it found
            await msg.delete()
            await ctx.message.delete()
            return tracks[0]
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

    @commands.command(name="connect", aliases=["join"], brief="Connects the bot to a channel", description="Connects the bot to the specified channel. If no channel is specified, the bot will join the invokers channel.")
    async def connect_command(self, ctx, *, channel: t.Optional[discord.VoiceChannel]):
        player = self.get_player(ctx)
        channel = await player.connect(ctx, channel)
        if channel is None:
            raise NoVoiceChannel
        await ctx.send(f"Joined {channel.name}")

    @commands.command(name="disconnect", aliases=["leave","dc","kys"], brief="Disconnects the bot from its current channel", description="Disconnects the bot from its current channel, if it is in a voice channel already. Usage: 'disconnect'")
    async def disconnect_command(self, ctx):
        player = self.get_player(ctx)
        await player.teardown()
        await ctx.send("Disconnected.")
    
    @commands.command(name="play", brief="Plays specified song", description="Adds the specified song to the queue. If the bot is not currently playing starts playback.")
    async def play_command(self, ctx, *, query):
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
                raise NoTracksFound

        await player.add_tracks(ctx, track)
        if not player.is_playing:
            newTrack = await db.get_next_track(ctx.guild.id, 0)
            newTrack = await self.wavelink.get_tracks(newTrack[0])
            await player.advance(newTrack[0])
            
    
    @commands.command(name="search", aliases=["s"], brief="Lists youtube results for specified keyword", description="Upon invocation returns an embed with the first 5 youtube results for the specified keyword. A user may use the emotes to choose one of the 5 tracks.")
    async def search_command(self, ctx, *, query):
        player = self.get_player(ctx)
        if not player.is_connected:
            await player.connect(ctx)
            
        if not re.match(URL_REGEX, query):
            query = f"ytsearch:{query}"  
        tracks = await self.wavelink.get_tracks(query)
        if tracks is None:
            raise NoTracksFound
        
        track = await player.choose_track(ctx, tracks)
        
        await player.add_tracks(ctx, track)
        
        if not player.is_playing:
            newTrack = await db.get_next_track(ctx.guild.id, 0)
            newTrack = await self.wavelink.get_tracks(newTrack[0])
            await player.advance(newTrack[0])
       
        
    @commands.command(name="stop", brief="Stops playback", description="Stops playback")
    async def stop_command(self, ctx):
        player = self.get_player(ctx)
        await db.clear_tracks(ctx.guild.id)
        await player.stop()
        await player.disconnect()
        await ctx.send("Playback stopped")
        
    
    @commands.command(name="skip", brief="Skips current song", description="Skips the currently playing song, as long as there is another one in the queue")
    async def skip_command(self, ctx):
        player = self.get_player(ctx)
        track = await db.get_next_track(ctx.guild.id, player.queue_position)
        if track is None:
            raise NoMoreTracks
        await player.stop()
        await ctx.send("Skipping...")
        
    @commands.command(name="shuffle", brief="Shuffles queue", description="Shuffles the queue. Includes songs already played in this session")
    async def shuffle_command(self, ctx):
        await db.shuffle_queue(ctx.guild.id)
        await ctx.send("Queue shuffled!")

    
    @commands.command(name="queue", aliases=["q"], brief="Displays the Queue", description="Displays current and upcoming tracks in an embed (max 20)")
    async def queue_command(self, ctx, amount=10):
        if amount > 20:
            amount = 20
        embedVar = discord.Embed(title="Queue", color=ctx.author.color, timestamp=dt.datetime.utcnow())
        player = self.get_player(ctx)
        pos = player.queue_position
        currentTrack = await db.get_track_name(ctx.guild.id, pos)
        if currentTrack is None:
            raise QueueIsEmpty
        embedVar.add_field(name="Currently Playing:",value=currentTrack[0], inline=False)
        trackList = ""
        for i in range(int(amount)):
            track = await db.get_track_name(ctx.guild.id, pos + i + 1)
            
            if track is not None:
                trackList = f"{trackList} \n {track[0]}"

        if(trackList!=""):
            embedVar.add_field(name="Next Up:",value=trackList, inline=False)
        

        embedVar.set_author(name="Query Results")                                                                  #Embed formatting
        embedVar.set_footer(text=f"Invoked by {ctx.author.display_name}", icon_url=ctx.author.avatar_url)
        await ctx.send(embed=embedVar)
        
    
    @commands.command(name="jump", brief="Skips to specified timestamp", description="Skips to the specified timestamp, timestamp has to be in seconds")
    async def jump_command(self, ctx, timestamp):
        player = self.get_player(ctx)
        if not player.is_playing:
            raise NotPlaying
        if not player.is_connected:
            raise NoVoiceChannel
        
        await player.seek(int(timestamp)*1000)
        await ctx.send(f"Jumped to {timestamp} seconds")
        
        
    
    @jump_command.error
    async def jump_command_error(self, ctx, exc):
        if isinstance(exc, NoVoiceChannel) or isinstance(exc, NotPlaying):
            await ctx.send("Not playing any Music")
        
    @connect_command.error
    async def connect_command_error(self, ctx, exc):
        if isinstance(exc, AlreadyConnectedToChannel):
            await ctx.send("Already connected to a voice channel.")
        elif isinstance(exc, NoVoiceChannel):
            await ctx.send("Please join a Voice Channel to use this command.")
    
    @play_command.error
    async def play_command_error(self, ctx, exc):
        if isinstance(exc, QueueIsEmpty):
            await ctx.send("No songs to play as the queue is empty.")
        elif isinstance(exc, NoVoiceChannel):
            await ctx.send("Please join a Voice Channel to use this command.")
        elif isinstance(exc, NoTracksFound):
            await ctx.send("No Tracks found. If you believe this is in error, please try again")
            
    @search_command.error
    async def search_command_error(self, ctx, exc):
        if isinstance(exc, NoTracksFound):
            await ctx.send("No Tracks found. If you believe this is in error, please try again")
        elif isinstance(exc, NoVoiceChannel):
            await ctx.send("Please join a Voice Channel to use this command.")
            
    @skip_command.error
    async def skip_command_error(self, ctx, exc):
        if isinstance(exc, NoMoreTracks):
            await ctx.send("No more tracks in queue.")
            
    @queue_command.error
    async def queue_command_error(self, ctx, exc):
        if isinstance(exc, QueueIsEmpty):
            await ctx.send("Queue is Empty")