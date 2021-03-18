import typing as t
import wavelink
import discord 
from discord.ext import commands
import re 
import sys
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

class PlayerIsAlreadyPaused(commands.CommandError):
    pass

class PlayerIsAlreadyPlaying(commands.CommandError):
    pass

class NoMoreTracks(commands.CommandError):
    pass

class NoValidRepeatMode(commands.CommandError):
    pass

#TODO: Clear the queue table when no tracks are left

#Regex matches youtube URL
URL_REGEX = r"(?i)\b((?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'\".,<>?«»“”‘’]))"


def setup(bot):                         #Adds this file as cog to the main bot
    bot.add_cog(Music(bot))

class Queue():                          #Class used by Player, handles everything that has to do with the "queue"
    def __init__(self):                 #Could possibly be removed and merged with the Player class, not planned as of yet
        self.position = 0
    
    @property
    def is_empty(self):
        if db.get_next_track_sync(self.posistion-1) == None:
            return True
        else:
            return False
    
    @property                               #@property describes a getter, in this case it is a getter for the current_track
    def current_track(self): 
        return db.get_next_track_sync(self.position-1)

    def add(self, *args):                   #Adds the specified track/s to the queue table
        for track in args:
            db.add_tracks_sync(track)
            print(f"Added {track} to db")


class Player(wavelink.Player):                  
    def __init__(self, *args, **kwargs):                        #Constructor for the wavelink player
        super().__init__(*args, **kwargs)
        self.queue = Queue()    
        
    async def connect(self, ctx, channel=None):                 #Tries and connects to target channel
        if self.is_connected:                                   
            raise AlreadyConnectedToChannel
        
        if(channel :=getattr(ctx.author.voice, "channel", channel)) is None:            #Checks if command invoker is in a voicechannel
            raise NoVoiceChannel
        
        await super().connect(channel.id)               #otherwise connects super(the bot) to the channel
        return channel
    
    async def start_playback(self):
        if self.queue.position > 0:
            position = self.queue.position - 1
        else:
            position = 0
        track = await db.get_next_track(position)
        if track is not None:
            track = track[0]
            if not re.match(URL_REGEX, track):
                track = f"ytsearch:{track}"
            track = await self.get_tracks(track)       
        await self.play(track)   
        
    async def advance(self, track):                                                    #Advances to the next track unless queue is empty
        if track is not None:
            await self.play(track)

        
    async def add_tracks(self, ctx, tracks):
        if isinstance(tracks, wavelink.TrackPlaylist):        
            self.queue.add(*tracks.tracks)
            await ctx.send("Added playlist to queue")
            if not self.is_playing: 
                await self.play(tracks.tracks[0])
                
        else:
            tracks = tracks[0]
            self.queue.add(tracks)
            await ctx.send(f"Added {tracks.title} to Queue")
            if not self.is_playing: 
                await self.play(tracks)


class Music(commands.Cog, wavelink.WavelinkMixin):

    def __init__(self, bot):
        self.bot = bot
        self.wavelink = wavelink.Client(bot=bot)                            
        self.bot.loop.create_task(self.start_nodes())

    @wavelink.WavelinkMixin.listener()                                          #Checks if node is ready to play music
    async def on_node_ready(self, node):
        await db.clear_tracks()
        print(f"Wavelink node {node.identifier} ready.")
        
    @wavelink.WavelinkMixin.listener("on_track_stuck")  
    @wavelink.WavelinkMixin.listener("on_track_end")
    @wavelink.WavelinkMixin.listener("on_track_exception")
    async def on_player_stop(self, node, payload):   
        track = db.get_next_track_sync(payload.player.queue.position)
        if track is not None:
            track = track[0]
            if not re.match(URL_REGEX, track):
                track = f"ytsearch:{track}"
            track = await self.wavelink.get_tracks(track)
            await payload.player.advance(track[0])
            payload.player.queue.position += 1
        else:
            await db.clear_tracks()
            await db.clear_auto_increment("queue")
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
        await ctx.send(f"Joined {channel.name}")

    @commands.command(name="play")
    async def play_command(self, ctx, *, query: str):
        
        player = self.get_player(ctx)
        if not player.is_connected:
            await player.connect(ctx)

        query = query.strip("<>")
        if not re.match(URL_REGEX, query):
            query = f"ytsearch:{query}"    
        track = await self.wavelink.get_tracks(query)
        await player.add_tracks(ctx, track)
        
    @commands.command(name="stop")
    async def stop_command(self, ctx):
        player = self.get_player(ctx)
        await db.clear_tracks()
        await db.clear_auto_increment("queue")
        await player.stop()
        await ctx.send("Playback stopped")
    
    @commands.command(name="skip")
    async def skip_command(self, ctx):
        player = self.get_player(ctx)
        await player.stop()
        await print("Skipping...")
        
        
        
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
            