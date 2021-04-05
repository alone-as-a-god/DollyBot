import asyncio
import aiosqlite
from aiosqlite import cursor
from aiosqlite.core import connect
import sqlite3 as sql3
import os
import random
DB_PATH = "../database/database.db"


#Since the  following functions are basically all the same, Only a few of them are documented

async def db_connect():                 #Method to establish connection with the database, has to be called in each and every method accessing the Database
    connection = await aiosqlite.connect(DB_PATH)
    return connection

async def add_guild(guildID, guildName):      #Adds guild with default prefix to the database
    connection = await db_connect()
    cursor = await connection.cursor()
    sql = '''
        INSERT INTO guild 
        (guildID, prefix, name)
        VALUES(?,?,?)
        '''
    await cursor.execute(sql, (str(guildID),str("!"), str(guildName)))
    await connection.commit()
    await connection.close()

async def update_prefix(guildID, newPrefix):    #Updates the prefix of the specified guild with the given prefix
    connection = await db_connect()             #calls method to establish connection to DB
    cursor = await connection.cursor()          #creates a cursor to execute Queries in the DB
    sql = '''                                   
        UPDATE guild
        SET prefix = ?
        WHERE guildID = ?
        '''
    await cursor.execute(sql, (str(newPrefix), str(guildID),))      #Executes the previously specified query with the given parameters, the "," at the end is necessary
    await connection.commit()                                       #Commits the previously created query
    await connection.close()                                        #closes the connection, which is necessary otherwise could cause other methods to fail 
        
async def get_prefix(guildID):              #Returns the prefix of the specified guild
    connection = await db_connect()         
    cursor = await connection.cursor()
    sql = '''
        SELECT prefix
        FROM guild
        WHERE guildID = ?
        '''
    await cursor.execute(sql, str(guildID),)
    fetched = await cursor.fetchone()
    await connection.close()
    return fetched[0]                   #[0] is necessary, otherwise would return as tuple instead of just the prefixes string value

async def update_prefix_dictionary(dictionary):
    connection = await db_connect()
    cursor = await connection.cursor()
    sql = '''
        SELECT *
        FROM guild
        '''
    await cursor.execute(sql)
    list = await cursor.fetchall()
    for row in list:
        id = str(row[0])
        prefix = row[1]
        dictionary[id] = prefix
    
    await connection.close()
    
async def update_position(guildID, position):
    connection = await db_connect()
    cursor = await connection.cursor()
    sql = '''
        UPDATE guild
        SET position = ?
        WHERE guildID = ?
        '''
    await cursor.execute(sql, (str(position), str(guildID),))
    await connection.commit()
    await connection.close()
    
    
async def get_last_track_id(guildID):
    connection = await db_connect()
    cursor = await connection.cursor()
    sql = '''
        SELECT MAX(id)
        FROM "queue"
        WHERE guildID = ?
        '''
    await cursor.execute(sql, (str(guildID),))
    fetched = await cursor.fetchone()
    await connection.close()

    if fetched[0] is None:
        return 0
    return fetched[0]
    
def get_last_track_id_sync(guildID):
    connection = sql3.connect(DB_PATH)
    cursor = connection.cursor()
    sql = '''
        SELECT MAX(id)
        FROM queue
        WHERE guildID=?
        '''
    cursor.execute(sql, (str(guildID),))
    fetched = cursor.fetchone()
    connection.close()
    if fetched[0] is None:
        return 0
    return fetched[0]

async def add_tracks(guildID, track, url):
    connection = await db_connect()
    
    cursor = await connection.cursor()
    sql = '''
        INSERT OR IGNORE
        INTO queue
        (guildID, id, songName, url)
        VALUES (?,?,?,?)
        '''
    await cursor.execute(sql, ((str(guildID)), str(await get_last_track_id(guildID)+1), str(track), str(url)))
    await connection.commit()
    await connection.close()
    
def add_tracks_sync(guildID, track, url):
    last_id = get_last_track_id_sync(guildID)+1
    connection = sql3.connect(DB_PATH)
    cursor = connection.cursor() #OR IGNORE
    sql = '''
        INSERT 
        INTO queue
        (guildID, id, songName, url)
        VALUES (?,?,?,?)
        '''
    cursor.execute(sql, ((str(guildID)), str(last_id), str(track), str(url),))
    connection.commit()
    connection.close()
    
    
async def get_next_track(guildID, current_track_id):
    connection = await db_connect()
    cursor = await connection.cursor()
    sql = '''
        SELECT url
        FROM queue
        WHERE id=? 
        AND guildID=?
        '''
    await cursor.execute(sql, (str(current_track_id+1), str(guildID),))
    track = await cursor.fetchone()
    await connection.close()
    return track

def get_next_track_sync(guildID, current_track_id):
    connection = sql3.connect(DB_PATH)
    cursor = connection.cursor()
    sql = '''
        SELECT url
        FROM queue
        WHERE id=?
        AND guildID=?
        '''
    
    cursor.execute(sql, (str(current_track_id+1), str(guildID),))
    track = cursor.fetchone()
    connection.close()
    return track

async def get_track_name(guildID, current_track_id):
    connection = await db_connect()
    cursor = await connection.cursor()
    sql = '''
        SELECT songName
        FROM queue
        WHERE id = ?
        AND guildID = ?
        '''
    await cursor.execute(sql, (str(current_track_id), str(guildID),))
    track = await cursor.fetchone()
    await connection.close()
    return track
        
async def clear_tracks(guildID):
    connection = await db_connect()
    cursor = await connection.cursor()
    sql = '''
        DELETE FROM queue
        WHERE guildID=?
        '''
    await cursor.execute(sql, (str(guildID),))
    await connection.commit()
    await connection.close()
    await update_position(guildID, 1)
    
async def clear_all_tracks():
    connection = await db_connect()
    cursor = await connection.cursor()
    sql = '''
        DELETE FROM queue
        '''
    await cursor.execute(sql)
    await connection.commit()
    
    sql = '''
        UPDATE guild
        SET position = 1
        '''
    await connection.close()

async def shuffle_queue(guildID):   #REWRITE FOR URL
    connection = await db_connect()
    cursor = await connection.cursor()
    sql = '''
        SELECT id, songName, url
        FROM "queue"
        WHERE guildID = ?
        '''
    await cursor.execute(sql, (str(guildID),))
    list = await cursor.fetchall()
    newList = []
    for seq in list:
        seq = (seq[1], seq[2])
        newList.append(seq)

    random.shuffle(newList)
    await clear_tracks(guildID)
    for i in newList:
        await add_tracks(guildID, i[0], i[1])
        
    

# async def main():                       #Testing out the above methods without using the bot directly
#     await shuffle_queue(123)
    

        
# if __name__ == "__main__":
#     DB_PATH = "database/database.db"
#     asyncio.run(main())                    #Used to call the main function in async mode