import socket

def notificationListener():                         #method gets called upon bot startup (bot.onready), accepts socket connections and prints received messages
    s = socket.socket()                             #Creates new socket
    port = 12345
    s.bind(('', port))                              #Binds the ip and port to the socket (127.0.0.1:12345)
    s.listen(5)                                     #Listens for up to 5 connections
    while True:                                         
        c, addr = s.accept()                        #accepts new connections
        print("Connection from",addr)
        rcvdData = c.recv(1024).decode()            #receives data sent, and prints it as a string
        print ("received:",rcvdData)

        c.close()                                   #since only one message is sent at a time, the socket gets closed again, to make sure other connections are possible
