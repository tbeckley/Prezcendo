from fitnessFunc import *
import random #for generating random numbers

def initBridge(chordProgress, musicPrev, musicNext, scale):
    bridge = [[0]*2]*16*8

    for row in bridge:
        print(row)

def composeBar(chord, scale):
    bar = [[0]*2]*16


def genScale(tonic):
    #there are 12 notes in total
    #this is the hexatonic scale (blues)
    #could potentially use heptatonic scale for more "major" tone in future
    scale = [tonic, tonic+3, tonic+5, tonic+6, tonic+7, tonic+10, tonic+12]
    return scale


msg = "Hello World. Python is running on your computer."
print(msg)

rows, cols = (2, 16*8) #4/4 time for this test case, melody and chord progression as rows
bridge = [[0]*cols]*rows

jazz = fitnessFunc("Jazz")
jazz.printBridge(bridge)

print(genScale(0))