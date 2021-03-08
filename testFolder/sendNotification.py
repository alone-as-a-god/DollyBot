import socket
import sys

#This script is not directly used in the python part of the project
#It is only used by node to send a message to the python Bot

#Usage: python sendNotification.py [message]

if __name__ == '__main__':
    if len(sys.argv)>1:
        s = socket.socket()
        s.connect(('127.0.0.1',12345))
        print("connection established")
        str = sys.argv[1]
        s.send(str.encode());
        s.close()
    else:
        print("error: not enough arguments")