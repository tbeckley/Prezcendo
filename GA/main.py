from fitnessFunc import *
from DNA import *
import random

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

def DNAFitnessTest():

    gene1 = [[0, -2, -2, -2, -2, 0, -1, 5, -2, -2, -2, 7, -2, -2, -2, -2, 
        0, -2, -2, -2, -2, 0, -1, 5, -2, -2, -2, 7, -2, -2, -2, -2, 
        0, -2, -2, -2, -2, 0, -1, 5, -2, -2, -2, 7, -2, -2, -2, -2, 
        0, -2, -2, -2, -2, 0, -1, 5, -2, -2, -2, 7, -2, -2, -2, -2,
        0, -2, -2, -2, -2, 0, -1, 5, -2, -2, -2, 7, -2, -2, -2, -2, 
        0, -2, -2, -2, -2, 0, -1, 5, -2, -2, -2, 7, -2, -2, -2, -2, 
        0, -2, -2, -2, -2, 0, -1, 5, -2, -2, -2, 7, -2, -2, -2, -2, 
        0, -2, -2, -2, -2, 0, -1, 5, -2, -2, -2, 7, -2, -2, -2, -2],
        
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]

    #test constructor function
    DNA1 = DNA(4, 4, 2, gene1)
    DNA2 = DNA(4, 4, 2)

    #test crossover function
    child = DNA1.crossover(DNA2)
    print(child.gene)

    child.mutate()
    print(child.gene)

    jazz = fitnessFunc("Jazz")
    fitness = jazz.fitnessCalc(child.gene, 0)
    print("FITNESS " + str(fitness))

#credit to https://stackoverflow.com/questions/15036009/suppose-i-have-three-weighted-choices-how-do-i-randomly-select-one
def weighted_choice(weights):
    choice = random.random() * sum(weights)
    for i, w in enumerate(weights):
        choice -= w
        if choice < 0:
            #print("WEIGHT: " + str(i))
            return i

    #print("WEIGHT: " + str(i))
    return i

def evolution(gen, childAmt, tonic):
    #init first population (from midi/tyler)
    gene1 = [[0, -2, -2, -2, -2, 0, -1, 5, -2, -2, -2, 7, -2, -2, -2, -2, 
        0, -2, -2, -2, -2, 0, -1, 5, -2, -2, -2, 7, -2, -2, -2, -2, 
        0, -2, -2, -2, -2, 0, -1, 5, -2, -2, -2, 7, -2, -2, -2, -2, 
        0, -2, -2, -2, -2, 0, -1, 5, -2, -2, -2, 7, -2, -2, -2, -2,
        0, -2, -2, -2, -2, 0, -1, 5, -2, -2, -2, 7, -2, -2, -2, -2, 
        0, -2, -2, -2, -2, 0, -1, 5, -2, -2, -2, 7, -2, -2, -2, -2, 
        0, -2, -2, -2, -2, 0, -1, 5, -2, -2, -2, 7, -2, -2, -2, -2, 
        0, -2, -2, -2, -2, 0, -1, 5, -2, -2, -2, 7, -2, -2, -2, -2],
        
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
    gene2 = []

    DNA1 = DNA(4, 4, 2, gene1)
    DNA2 = DNA(4, 4, 2)

    children = []

    jazz = fitnessFunc("Jazz")

    for i in range(childAmt):
        children.append(DNA1.crossover(DNA2))

    for g in range(gen):
        fitness = []

        for val in children:
            #print(val.gene)
            fitness.append(jazz.fitnessCalc(val.gene, tonic))
        #print(fitness)

        newChildren = []
        for i in range(childAmt):
            index1 = int(weighted_choice(fitness))
            index2 = int(weighted_choice(fitness))

            while index1 == index2: #don't want asexual reproduction
                index2 = weighted_choice(fitness)

            parent1 = children[index1]
            parent2 = children[index2]

            newChildren.append(parent1.crossover(parent2))
            newChildren[-1].mutate() #mutates last element

        children = newChildren

    print(fitness)
    for val in children:
        print(val.gene)
    

    #generate 5 children
    #apply fitness to all children
    #normalize
    #use to calculate probability of selecting child as parent
    #generate 5 new children from randomly selected parents (randomly select each time, reroll if it's the same)

msg = "Hello World. Python is running on your computer."
print(msg)

evolution(100, 5, 0)

#tests
#ALtests()
#DNAFitnessTest()



