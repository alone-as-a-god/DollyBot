import typing as t
import wavelink
import discord 
from discord.ext import commands
import re 
import sys
sys.path.append("../database")
import db

URL_REGEX = r"(?i)\b((?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'\".,<>?«»“”‘’]))"

def setup(bot):
    bot.add_cog(Music(bot))

class Queue():
    def __init__(self):
        self._queue = []
        self.position = 0
    
    @property
    def is_empty(self):
        return not self._queue
    
    @property                               #@property describes a getter, in this case it is a getter for the current_track
    def current_track(self):
        if not self._queue:
            raise QueueIsEmpty
        
        if self.position <= len(self._queue) - 1:       #len -1 because position can be 0
            return self._queue[self.position]

    def add(self, *args):
        self._queue.extend(args)
    
    def get_track_by_id(self, id):
        return self._queue[id]
        
    def get_next_track(self):
        if not self._queue:
            return None
        self.position += 1   
        if self.position < 0:
            return None   
        if self.position > len(self._queue) -1:
            self.position = 0
            
        return self._queue[self.position]
    

        

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
        await self.play(self.queue.current_track)   
        
    async def advance(self):                                                    #Advances to the next track unless queue is empty
        print("rip")
        if (track:= self.queue.get_next_track()) is not None:
            await self.play(track)

        
    async def add_tracks(self, ctx, tracks):
        if isinstance(tracks, wavelink.TrackPlaylist):
            self.queue.add(*tracks.tracks)
            await ctx.send("Added playlist to queue")
        elif len(tracks) == 1:
            self.queue.add(tracks[0])
            await ctx.send(f"Added {tracks[0].title} to Queue")
        else:
            tracks = tracks[0]
            self.queue.add(tracks)
            await ctx.send(f"Added {tracks.title} to Queue")
        if not self.is_playing and not self.queue.is_empty: 
            await self.start_playback()
        

   
    
    
class Music(commands.Cog, wavelink.WavelinkMixin):

    def __init__(self, bot):
        self.bot = bot
        self.wavelink = wavelink.Client(bot=bot)                            
        self.bot.loop.create_task(self.start_nodes())

    @wavelink.WavelinkMixin.listener()                                          #Checks if node is ready to play music
    async def on_node_ready(self, node):
        #await db.update_shortcut_dictionary()   
        print(f"Wavelink node {node.identifier} ready.")
        
    @wavelink.WavelinkMixin.listener("on_track_stuck")  
    @wavelink.WavelinkMixin.listener("on_track_end")
    @wavelink.WavelinkMixin.listener("on_track_exception")
    async def on_player_stop(self, node, payload):   
        print("nice")#if either of the above cases occurs, check if the player is on repeat, if yes, repeat the track, otherwise advance to the next one. Necessary cause otherwise the player can literally kill itself and stop playing music forever
        await payload.player.advance()
    
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
        
        await player.add_tracks(ctx, await self.wavelink.get_tracks(query))
        
        
        
    async def add_tracks_from_db(self, ctx):
        player = self.get_player(ctx)
        position = player.queue.position
        print(position)
        track = await db.get_next_track(position)
        print(track[0])
        track = track[0]
        if not re.match(URL_REGEX, track):
            track = f"ytsearch:{track}"
        track = await self.wavelink.get_tracks(track)
        
        #await player.add_tracks(ctx, track)
        if isinstance(track, wavelink.TrackPlaylist):
            self.queue.add(*track.tracks)
        elif len(track) == 1:
            self.queue.add(track[0])
        else:
            track = track[0]
            player.queue.add(track)
        print(f"Added {track.title} to Queue ON DATABASE DEBUG DELETE LATER LALILU") 
        await db.update_track(track.title, position)
        #await player.start_playback() 
    
    @commands.command(name="dbm")
    async def dbm_command(self, ctx):
        await self.add_tracks_from_db(ctx)
        
    
   