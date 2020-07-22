from fitnessFunc import *
from DNA import *
from service import *
from testSongs import *
import random

#to reduce merge conflicts
def ALtests():
    rows, cols = (2, 16*8) #4/4 time for this test case, melody and chord progression as rows
    bridge = [[-2]*cols]*rows

    jazz = fitnessFunc("Jazz")

    bridge = SongThatMightPlay
    fitness = jazz.fitnessCalc(LaVieEnRose, 2, LaVieEnRose, LaVieEnRose)
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
    fitness = jazz.fitnessCalc(child.gene, 0, DNA1.gene, DNA2.gene)
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

def genInitPop(childAmt, crossVer, song1, song2, tonic):
    #init first population (from midi/tyler)

    gene1 = song1 #placeholders for now instead of the midis we will be passed
    
    gene2 = song2

    DNA1 = DNA(4, 4, 2, gene1)
    DNA2 = DNA(4, 4, 2, gene2)

    jazz = fitnessFunc("Jazz")
    print("First Track: " + str(jazz.fitnessCalc(gene1, tonic, gene1, gene2))) 
    print("Second Track: " + str(jazz.fitnessCalc(gene2, tonic, gene1, gene2))) 

    children = []

    if crossVer == 1:
        for i in range(childAmt):
            children.append(DNA1.crossover(DNA2))
    else:
        for i in range(childAmt):
            children.append(DNA1.crossover2(DNA2))
    
    return children

def evolution(gen, childAmt, tonic, initialPop, crossVer, gene1, gene2):
    children = initialPop
    jazz = fitnessFunc("Jazz")
    total = 0

    for g in range(gen):
        total = 0
        fitness = []

        for val in children:
            #print(val.gene)
            fitness.append(jazz.fitnessCalc(val.gene, tonic, gene1, gene2))
            total += fitness[-1]
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
    print(total)
    return children

crossVer = 2 #TODO: CHANGE THIS whenever you want to switch between the crossover functions
tonic = 3
song1 = LaVieEnRose
song2 = GoldenWind
init = genInitPop(10, crossVer, song1, song2, tonic)

children = evolution(80, 10, tonic, init, crossVer, song1, song2)

for val in children:
    print(val.gene)

#tests
#ALtests()
#DNAFitnessTest()



