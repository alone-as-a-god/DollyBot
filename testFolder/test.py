import sys
import os
import asyncio

async def main():
    print("Welcome to " +  os.getcwd())
    
asyncio.run(main())