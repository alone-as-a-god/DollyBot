import socket 
import os
import sys


HOST = "localhost"
PORT = 12345
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((HOST, PORT))
s.listen(5)

c, addr = s.accept()


data = c.recv(1024)
print(data.decode())