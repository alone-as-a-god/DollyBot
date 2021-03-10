import asyncio
import aiosqlite
from aiosqlite import cursor
from aiosqlite.core import connect
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
    
async def add_tracks(track):
    connection = await db_connect()
    cursor = await connection.cursor()
    sql = '''
        INSERT OR IGNORE
        INTO queue
        (identifier)
        VALUES (?)
        '''
    
    await cursor.execute(sql, (str(track),))
    await connection.commit()
    await connection.close()
    
async def get_next_track(current_track_id):
    connection = await db_connect()
    cursor = await connection.cursor()
    sql = '''
        SELECT identifier
        FROM queue
        WHERE id=?
        '''
    
    await cursor.execute(sql, (str(current_track_id+1),))
    track = await cursor.fetchone()
    await connection.close()
    return track

async def update_track(track_name, track_id):
    connection = await db_connect()
    cursor = await connection.cursor()
    sql = '''
        UPDATE queue 
        SET identifier = ?
        WHERE id = ?
        '''
    await cursor.execute(sql, (str(track_name), str(track_id+1)))
    print("habibi")
    await connection.commit()
    await connection.close()
        


async def main():                       #Testing out the above methods (working as of now)
    list = await get_next_track(5)
    print([x[0] for x in list])
        
if __name__ == "__main__":
    DB_PATH = "database/database.db"
    asyncio.run(main())                    #Used to call the main function in async mode
# print(os.getcwd())