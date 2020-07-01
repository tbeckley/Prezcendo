# class for the DNA
class DNA:
    length = 8 # calculated using time signature, replace later (See calculation below)
    tracks = 3 # number of tracks/instruments determined by input blocks, replace later

# I'm going to assume the bridge will always be 8 bars long
# and the smallest note is a 16th note
# so total length (number of 16th notes) will be calculated by:
# 8 bars x numerator x denominator / 16

    # gene = 2d array, tracks # of arrays with length # of notes per array 

    mutationRate = 0.05 # replace with whatever rate you want
    highestNote = 24 # assuming lowest note is 0, and we want a 2-octave span
    
    def mutate(self):
        for track in self.gene:
            for note in track:
                surprise = random()
                if ((surprise >= mutationRate) and (self.gene[track][note-1] > -2)):
                    newNote = # random from -1 to 24
                else if (surprise >= mutationRate and self.gene[track][note-1] = -2)
                    newNote = # random from -2 to 24 (maybe more weight for -2?)
                self.gene[track][note] = newNote

        self.fixup()

    # crossover function, to be determined
    def crossover(self, partner):

    # function for removing holds (-2) that don't have a proper start
    def fixup(self):
