from sys import version_info
from sys import platform

MAJOR_VERSION = 3
MINOR_VERSION = 9


def setup():
    if version_info[0] != MAJOR_VERSION or version_info[1] != MINOR_VERSION:
        print("Wrong Python version. Please use version 3.9")
        exit(1)

    if platform == "linux" or platform == "linux2":
        linux_setup()
    elif platform == "win32":
        windows_setup()
    else:
        print("OS not supported")


def windows_setup():
    if platform != "win32":
        exit(1)


def linux_setup():
    if platform != "linux" and platform != "linux2":
        exit(1)


if __name__ == "__main__":
    setup()
