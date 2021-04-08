import discord
from discord.ext import commands
import os
from dotenv import load_dotenv
from threading import Thread
import sys
sys.path.append("../database")
import db
import server
from myDict import prefix_dict as prefix_dictionary
import asyncio


extensions = ["music"]                  #Upon adding new extensions, add them here so they get loaded by the bot

def get_prefix(bot, message):           #gets called every time a message is received, checks if the message contains prefix from the corresponding server
    key = str(message.guild.id)
    return prefix_dictionary[key]

bot = commands.Bot(command_prefix=get_prefix)   #read comment above

@bot.event
async def on_guild_join( guild):                            #Whenver the bot gets added to a new server(from now on called guild) it adds the server to the database
    print(f"Joined new Guild {guild.name}:{guild.id}")
    await db.add_guild(guild.id, guild.name)
    await db.update_prefix_dictionary(prefix_dictionary)


@bot.event
async def on_ready():                                                               #When the bot has started up successfully it executres the following functions
    await bot.change_presence(activity=discord.Game(name="the best Music"))             #Sets the status of the bot (discord status)
    thread = Thread(target=asyncio.run, args=(server.notification_Listener(),))       #Starts a new thread with the socketserver, to listen for new messages (target asyncio so it runs in async mode lol)
    thread.start()
    await db.update_prefix_dictionary(prefix_dictionary)                            #Updates the prefix dictionary so commands can be used
    print('Logged in')
    
    
@bot.command(name="ping", aliases=["p"], brief="Checks if bot is available")                #Test command to check if bot is responding to commands
async def pingCommand(ctx):
    await ctx.send("Jolene")

@bot.command(name="prefix", brief="Changes prefix to specified prefix", description="Changes the current prefix to a new one, can be characters or even full words")                                     #Command to allow changing the prefix
async def prefix_command(ctx, prefix):                          
    await db.update_prefix(ctx.guild.id, prefix)                    
    await db.update_prefix_dictionary(prefix_dictionary)
    await ctx.send(f"Prefix changed to '{prefix}'")
    
@bot.command(name="purge", brief="Deletes specified amount of messages, default 10", description="Deletes last x messages in the current channel, x defaults to 10")                                      #Deletes specified amount of messages from current discord channel (default 10)
async def purge_command(ctx, amount=10):
    await ctx.channel.purge(limit=amount)

@bot.command(name="debugRestart", hidden=True)              
async def restart_command(ctx):
    os.execv(sys.executable,[sys.executable.split("/")[-1]]+sys.argv)

if __name__ == "__main__":
    for extension in extensions:
        bot.load_extension(extension)

bot.run("NzgzNDIwNDE0Njc5ODQyODI5.X8afHg._ivNUFs_6POptffvhcngv0Eg2K8") 
