import socket

#Does basically nothing at all except establish socket connection and send a message

s = socket.socket()
s.connect(('127.0.0.1',12345))

str = "notification!!"
s.send(str.encode());
s.close()
