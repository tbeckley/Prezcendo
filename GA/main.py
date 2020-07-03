from fitnessFunc import *

#to reduce merge conflicts
def ALtests():
    rows, cols = (2, 16*8) #4/4 time for this test case, melody and chord progression as rows
    bridge = [[-2]*cols]*rows

    jazz = fitnessFunc("Jazz")
    jazz.printBridge(bridge)
    jazz.fitnessCalc(bridge, 0)




msg = "Hello World. Python is running on your computer."
print(msg)

ALtests()



