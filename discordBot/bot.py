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


extensions = ["music"]

def get_prefix(bot, message):
    print(str(prefix_dictionary))
    key = str(message.guild.id)
    return prefix_dictionary[key]

bot = commands.Bot(command_prefix=get_prefix)



@bot.event
async def on_ready():
    await bot.change_presence(activity=discord.Game(name="the best Music"))
    thread = Thread(target=asyncio.run, args=(server.notification_Listener(),))       #Starts a new thread with the socketserver, to listen for new messages (target asyncio so it runs in async mode lol)
    thread.start()
    await db.update_prefix_dictionary(prefix_dictionary)
    print('Logged in')
    
@bot.command(name="ping", aliases=["p"])
async def pingCommand(ctx):
    await ctx.send("Jolene")

# @bot.command(name="testDictionary", aliases=["td"])
# async def test_Dictionary_Command(ctx=None):
#     print("before: "+str(prefix_dictionary))
#     await db.update_prefix_dictionary(prefix_dictionary)
#     print("after: "+str(prefix_dictionary))
if __name__ == "__main__":
    for extension in extensions:
        bot.load_extension(extension)

bot.run(os.getenv("BOT_TOKEN")) 