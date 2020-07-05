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

def genInitPop(childAmt, crossVer):
    #init first population (from midi/tyler)

    #careless whisper
    gene1 = [[19, -2, -2, -2, 17, -2, 12, -2, -2, -2, 8, -2, -2, -2, -2, -2, 19, -2, -2, -2, 17, -2, 12, -2, -2, -2, 8, -2, -2, -2, -1, -1,  15, -2, -2, -2, 13, -2, 8, -2, -2, -2, 5, -2, -2, -2, -2, -2, 15, -2, -2, -2, 13, -2, 8, -2, -2, -2, -2, -2, -2, -2, -2, -2, 13, -2, -2, -2, 12, -2, 8, -2, -2, -2, -2, -2, 5, -2, -2, -2, 1, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -1, -1, 0, -2, -2, -2, 1, -2, -2, -2, 3, -2, -2, -2, 5, -2, -2, -2, 7, -2, -2, -2, 8, -2, -2, -2, 10, -2, -2, -2, 12, -2, -2, -2],
        
        [-1, -1, -1, -1, 5, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -1, -1, -1, -1, 10, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -1, -1, -1, -1, -1, 0, -2, -2, -2, -1, -1, 1, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -1, -1, 12, -2, -2, -2, -2, -2, -2, -2, -1, -1, -1, -1, 12, -2, -1, -1, 12, -2, -2, -2, -2, -2, -2, -2, -2, -2]]
    
    #giorno's theme
    gene2 =  [[12, -2, -2, -2, -1, -1, 8, -2, -2, -2, -2, -2, -1, -1, 8, 10, 11, -2, -2, 10, -2, -2, 8, -2, 7, -2, -2, 8, -2, -2, 10, -2, 12, -2, -1, 12, -1, -1, 17, -2, -2, -2, -2, -2, 5, -1, 7, -1, 8, -2, -2, 10, -2, -2, 8, -2, 9, -2, -2, 15, -2, -2, 13, -2, 12, -2, -2, -2, -1, -1, 8, -2, -2, -2, -2, -2, -1, -1, 8, 10, 11, -2, -2, 10, -2, -2, 8, -2, 7, -2, -2, 8, -2, -2, 10, -2, 12, -2, -2, -2, -1, -1, 17, -2, -2, -2, -2, -1, 17, -1, 19, -1, 20, -2, -2, 13, -2, -2, 12, -2, 11, -2, -2, 20, -2, -2, 16, -2],
        
        [5, -2, -2, -2, -1, -1, 2, -2, -2, -2, -2, -2, -2, -2, -2, -2, 7, -2, -2, -2, -2, -2, -1, -1, 0, -2, -2, -2, -2, -2, -2, -2, 5, -2, -2, -2, -1, -1, 2, -2, -2, -2, -2, -2, -2, -2, -2, -2, 7, -2, -2, -2, -2, -2, -1, -1, 0, -2, -2, -2, -2, -2, -2, -2, 5, -2, -2, -2, -1, -1, 2, -2, -2, -2, -2, -2, -2, -2, -2, -2, 7, -2, -2, -2, -2, -2, -1, -1, 0, -2, -2, -2, -2, -2, -2, -2, 5, -2, -2, -2, -1, -1, 2, -2, -2, -2, -2, -2, -2, -2, -2, -2, 7, -2, -2, -2, -2, -2, -2, -2, 0, -2, -2, -2, -2, -2, -2, -2]]

    DNA1 = DNA(4, 4, 2, gene1)
    DNA2 = DNA(4, 4, 2)

    jazz = fitnessFunc("Jazz")
    print("Careless Whisper: " + str(jazz.fitnessCalc(gene1, 0))) #originally in B, transposed to C, lowest note C
    print("Giorno's theme: " + str(jazz.fitnessCalc(gene2, 7))) #originally in D, transposed to G, lowest note A

    children = []

    if crossVer == 1:
        for i in range(childAmt):
            children.append(DNA1.crossover(DNA2))
    else:
        for i in range(childAmt):
            children.append(DNA1.crossover2(DNA2))
    
    return children

def evolution(gen, childAmt, tonic, initialPop, crossVer):
    children = initialPop
    jazz = fitnessFunc("Jazz")

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
                index2 = int(weighted_choice(fitness))

            parent1 = children[index1]
            parent2 = children[index2]

            if crossVer == 1:
                newChildren.append(parent1.crossover(parent2))
            else:
                newChildren.append(parent1.crossover2(parent2))

            newChildren[-1].mutate() #mutates last element

        children = newChildren

    print("FITNESS: " + str(fitness))
    return children
    

    #generate 5 children
    #apply fitness to all children
    #normalize
    #use to calculate probability of selecting child as parent
    #generate 5 new children from randomly selected parents (randomly select each time, reroll if it's the same)

#msg = "Hello World. Python is running on your computer."
#print(msg)

crossVer = 1
init = genInitPop(10, crossVer)
children = evolution(1, 10, 0, init, crossVer)
children = evolution(1, 10, 0, children, crossVer)
children = evolution(1, 10, 0, children, crossVer)
children = evolution(3, 10, 0, children, crossVer)
children = evolution(5, 10, 0, children, crossVer)
children = evolution(10, 10, 0, children, crossVer)

for val in children:
    print(val.gene)

#tests
#ALtests()
#DNAFitnessTest()



