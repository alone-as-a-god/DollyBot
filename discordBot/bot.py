import discord
from discord.ext import commands
import os
from dotenv import load_dotenv
from threading import Thread
import sys
sys.path.append("../database")
import db
import server


prefix_dictionary = {}

def get_prefix(bot, message):
    key = str(message.guild.id)
    return prefix_dictionary[key]


bot = commands.Bot(command_prefix=os.getenv("BOT_PREFIX"))

@bot.event
async def on_ready():
    await bot.change_presence(activity=discord.Game(name="the best Music"))
    thread = Thread(target=server.notificationListener, daemon=True)         #Starts a new thread with the socketserver, to listen for new messages
    thread.start()
    print('Logged in')
    
@bot.command(name="ping", aliases=["p"])
async def pingCommand(ctx):
    await ctx.send("Jolene")

@bot.command(name="testDictionary", aliases=["td"])
async def testDictionaryCommand(ctx=None):
    print("before: "+str(prefix_dictionary))
    await db.update_prefix_dictionary(prefix_dictionary)
    print("after: "+str(prefix_dictionary))

bot.run(os.getenv("BOT_TOKEN")) 