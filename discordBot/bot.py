import discord
from discord.ext import commands
import os
from dotenv import load_dotenv
import server
from threading import Thread

bot = commands.Bot(command_prefix=os.getenv("BOT_PREFIX"))

@bot.event
async def on_ready():
    await bot.change_presence(activity=discord.Game(name="the best Music"))
    thread = Thread(target=server.notificationListener)         #Starts a new thread with the socketserver, to listen for new messages
    thread.start()
    print('Logged in')
    
@bot.command(name="ping", aliases=["p"])
async def pingCommand(ctx):
    await ctx.send("Jolene")


bot.run(os.getenv("BOT_TOKEN")) 