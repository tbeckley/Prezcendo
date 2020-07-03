from fitnessFunc import *

#to reduce merge conflicts
def ALtests():
    rows, cols = (2, 16*8) #4/4 time for this test case, melody and chord progression as rows
    bridge = [[-2]*cols]*rows

    jazz = fitnessFunc("Jazz")
    # jazz.printBridge(bridge)
    # fitness = jazz.fitnessCalc(bridge, 0)
    # print(fitness)

    # bridge = [[0]*cols]*rows
    # fitness = jazz.fitnessCalc(bridge, 0)
    # print(fitness)

    # bridge = [[0, -2, -2, -2, -2, 0, -1, 5, -2, -2, -2, 7, -2, -2, -2, -2, 
    #     0, -2, -2, -2, -2, 0, -1, 5, -2, -2, -2, 7, -2, -2, -2, -2, 
    #     0, -2, -2, -2, -2, 0, -1, 5, -2, -2, -2, 7, -2, -2, -2, -2, 
    #     0, -2, -2, -2, -2, 0, -1, 5, -2, -2, -2, 7, -2, -2, -2, -2]]*rows

    bridge = [[0, -2, -2, -2, -2, 0, -1, 5, -2, -2, -2, 7, -2, -2, -2, -2, 
        0, -2, -2, -2, -2, 0, -1, 5, -2, -2, -2, 7, -2, -2, -2, -2, 
        0, -2, -2, -2, -2, 0, -1, 5, -2, -2, -2, 7, -2, -2, -2, -2, 
        0, -2, -2, -2, -2, 0, -1, 5, -2, -2, -2, 7, -2, -2, -2, -2],
        
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
    fitness = jazz.fitnessCalc(bridge, 0)
    print(fitness)

msg = "Hello World. Python is running on your computer."
print(msg)

ALtests()



