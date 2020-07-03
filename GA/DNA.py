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

    mutationRate = 0.05 # replace with whatever rate you want
    highestNote = 24 # assuming lowest note is 0, and we want a 2-octave span

    def __init__(self, numerator, denominator, track, genes=None):
        self.length = 8*numerator*denominator/16
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
                if ((surprise >= self.mutationRate) and (self.gene[track][note] > -1)):
                    newNote = random.randrange(-1, 24) # random from -1 to 24
                elif ((surprise >= self.mutationRate)):
                    newNote = random.randrange(-2, 24) # random from -2 to 24
                self.gene[track][note] = newNote
        self.fixup()

    # crossover function, picks a random location between bars and splits there
    def crossover(self, partner):
        location = random.randrange(1, 7) # random split location between 1 and 7
        firstParent = random.randrange(0, 1) # pick a random parent to be "first"

        if (firstParent == 0):
            for track in range(len(self.gene)):
                child = self.gene[track][0:self.length*location/8]
                child.append(partner.gene[track][self.length*location/8 : self.length-1])
        else:
            for track in range(len(self.gene)):
                child = partner.gene[track][0:self.length*location/8]
                child.append(self.gene[track][self.length*location/8 : self.length-1])
        child.fixup()
        return child

    # function for removing holds (-2) that don't have a proper start
    def fixup(self):
        for track in range(len(self.gene)):
            for note in range(len(self.gene[track])):
                if ((self.gene[track][note] == -2) and (note == 0)):
                    self.gene[track][note] = -1
                elif ((self.gene[track][note] == -2) and (self.gene[track][note-1] == -1)):
                    self.gene[track][note] = -1

    def setFitness(self, newFitness):
        self.fitness = newFitness