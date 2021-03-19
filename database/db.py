import asyncio
import aiosqlite
from aiosqlite import cursor
from aiosqlite.core import connect
import sqlite3 as sql3
import os
DB_PATH = "../database/database.db"


async def db_connect():                 #Method to establish connection with the database, has to be called in each and every method accessing the Database
    connection = await aiosqlite.connect(DB_PATH)
    return connection

async def update_prefix(guildID, newPrefix):    #Updates the prefix of the specified guild with the given prefix
    connection = await db_connect()             #calls method to establish connection to DB
    cursor = await connection.cursor()          #creates a cursor to execute Queries in the DB
    sql = '''                                   
        UPDATE prefixes
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
        FROM prefixes
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
        FROM prefixes
        '''
    await cursor.execute(sql)
    list = await cursor.fetchall()
    for row in list:
        id = row[0]
        prefix = row[1]
        dictionary[id] = prefix
    
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

    if fetched is None:
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
    print(fetched)
    if fetched[0] is None:
        return 0
    return fetched[0]

async def add_tracks(guildID, track):
    connection = await db_connect()
    
    cursor = await connection.cursor()
    sql = '''
        INSERT OR IGNORE
        INTO queue
        (guildID, id, songName)
        VALUES (?,?,?)
        '''
    await cursor.execute(sql, ((str(guildID)), str(await get_last_track_id(guildID)+1), str(track),))
    await connection.commit()
    await connection.close()
    
def add_tracks_sync(guildID, track):
    last_id = get_last_track_id_sync(guildID)+1
    connection = sql3.connect(DB_PATH)
    cursor = connection.cursor() #OR IGNORE
    sql = '''
        INSERT 
        INTO queue
        (guildID, id, songName)
        VALUES (?,?,?)
        '''
    
    cursor.execute(sql, ((str(guildID)), str(last_id), str(track)))
    connection.commit()
    connection.close()
    
    
async def get_next_track(guildID, current_track_id):
    connection = await db_connect()
    cursor = await connection.cursor()
    sql = '''
        SELECT songName
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
        SELECT songName
        FROM queue
        WHERE id=?
        AND guildID=?
        '''
    
    cursor.execute(sql, (str(current_track_id+1), str(guildID),))
    track = cursor.fetchone()
    connection.close()
    return track

async def update_track(guildID, track_name, track_id):
    connection = await db_connect()
    cursor = await connection.cursor()
    sql = '''
        UPDATE queue 
        SET songName = ?
        WHERE id = ?
        AND guildID=?
        '''
    await cursor.execute(sql, (str(track_name), str(track_id), str(guildID)))
    await connection.commit()
    await connection.close()
        
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
    
async def clear_all_tracks():
    connection = await db_connect()
    cursor = await connection.cursor()
    sql = '''
        DELETE FROM queue
        '''
    await cursor.execute(sql)
    await connection.commit()
    await connection.close()

async def main():                       #Testing out the above methods (working as of now)
    await add_tracks(1, "despacito")
    

        
if __name__ == "__main__":
    DB_PATH = "database/database.db"
    asyncio.run(main())                    #Used to call the main function in async mode
# print(os.getcwd())