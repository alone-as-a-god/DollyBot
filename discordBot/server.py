import socket
import os
import sys
sys.path.append("../database")
import db
from myDict import prefix_dict as prefix_dictionary

async def notification_Listener():                         #method gets called upon bot startup (bot.onready), accepts socket connections and prints received messages
    s = socket.socket()                             #Creates new socket
    ip = "127.0.0.1"
    port = 12345
    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    s.bind((ip, port))                              #Binds the ip and port to the socket (127.0.0.1:12345)
    s.listen(5)                                     #Listens for up to 5 connections
    while True:                                         
        c, addr = s.accept()                        #accepts new connections
        print("Connection from",addr)
        rcvdData = c.recv(1024).decode()            #receives data sent, and prints it as a string
        print ("received:",rcvdData)
        if(rcvdData == "updatePrefix"):
            await db.update_prefix_dictionary(prefix_dictionary)
            print("after: " +str(prefix_dictionary))
        c.close()                                   #since only one message is sent at a time, the socket gets closed again, to make sure other connections are possible
