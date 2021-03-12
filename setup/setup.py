from sys import platform

def setup():
    if platform == "linux" or platform == "linux2":
        linux_setup()
    elif platform == "win32":
        windows_setup()
    else:
        print("OS not supported")

def windows_setup():
    if platform != "win32":
        exit()

    
    


def linux_setup():
    if platform != "linux" and platform != "linux2":
        exit()
    
    