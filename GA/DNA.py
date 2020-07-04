import math
import random

# class for the DNA
class DNA:
    # I'm going to assume the bridge will always be 8 bars long
    # and the smallest note is a 16th note
    # so total length (number of 16th notes) will be calculated by:
    # 8 bars x numerator x denominator / 16

    # length: calculated using time signature, explained above
    # tracks: number of tracks/instruments determined by input blocks, replace later
    # gene: 2d array with dimensions tracks*length
    # fitness: an object's fitness, defaults to 0 but can be calculated using fitness functions

    mutationRate = 0.01 # replace with whatever rate you want
    highestNote = 24 # assuming lowest note is 0, and we want a 2-octave span

    def __init__(self, numerator, denominator, track, genes=None):
        self.nn = numerator
        self.dd = denominator
        self.length = int(16*numerator/denominator)
        self.tracks = track
        self.fitness = 0

        if genes is None:
            self.gene = []

            # fills the 2d array with rests
            for i in range(self.tracks):
                new = []
                for j in range(self.length):
                    new.append(-1)
                self.gene.append(new)
        else:
            self.gene = genes

            # To Do later: making sure the 2d array that was given matches the size that was given
            
            # if (len(self.gene) > self.tracks):
                # cut out extra tracks
            # elif (len(self.gene) < self.tracks):
                # add empty tracks
            # if (len(self.gene[0]) > self.length):
                # cut out extra notes
            # elif (len(self.gene[0]) < self.length):
                # add empty notes
        
    def mutate(self):
        for track in range(len(self.gene)):
            for note in range(len(self.gene[track])):
                surprise = random.random()
                # if ((surprise >= self.mutationRate) and (self.gene[track][note] > -1)):
                #     newNote = random.randrange(-1, 24) # random from -1 to 24
                #     self.gene[track][note] = newNote
                # elif ((surprise >= self.mutationRate)):
                #     newNote = random.randrange(-2, 24) # random from -2 to 24
                #     self.gene[track][note] = newNote
                if ((surprise >= self.mutationRate)):
                    newNote = random.randrange(-2, 5) # random from -2 to 24
                    if (newNote >= 0):
                        newNote = random.randrange(0, 24)
                    self.gene[track][note] = newNote
        #print("BEFORE FIXUP " + str(self.gene)) 
        self.fixup()
        #print("AFTER FIXUP " + str(self.gene))  

    # crossover function, picks a random location between bars and splits there
    def crossover(self, partner):
        location = random.randrange(1, 7) # random split location between 1 and 7
        firstParent = random.randrange(0, 1) # pick a random parent to be "first"
        child = []

        if (firstParent == 0):
            #print(len(self.gene))
            for track in range(len(self.gene)):
                newTrack = self.gene[track][0:int(self.length*location/8)]
                #print("NEW TRACK " + str(newTrack))
                newTrack.extend(partner.gene[track][int(self.length*location/8) : int(self.length)])
                #print("NEW TRACK AFTER " + str(newTrack))
                child.append(newTrack)
        else:
            for track in range(len(self.gene)):
                newTrack = partner.gene[track][0:int(self.length*location/8)]
                #print("NEW TRACK " + str(newTrack))
                newTrack.extend(self.gene[track][int(self.length*location/8) : int(self.length)])
                #print("NEW TRACK AFTER " + str(newTrack))
                child.append(newTrack)
        
        #print("CHILD " + str(child))
        childDNA = DNA(self.nn, self.dd, self.tracks, child)
        childDNA.fixup()
        #print("CHILD " + str(child))
        return childDNA

    # function for removing holds (-2) that don't have a proper start
    #TODO: still needs to be tested
    def fixup(self):
        for track in range(len(self.gene)):
            for note in range(len(self.gene[track])):
                if ((self.gene[track][note] == -2) and (note == 0)):
                    self.gene[track][note] = -1
                elif ((self.gene[track][note] == -2) and (self.gene[track][note-1] == -1)):
                    self.gene[track][note] = -1

    def setFitness(self, newFitness):
        self.fitness = newFitness