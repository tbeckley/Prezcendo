# class for assessing fitness

class fitnessFunc:
    genre = "Jazz"  # default for now, will be enum with different genres later

    # bridge = [[0]*1]*1

    def __init__(self, genre):
        self.genre = genre
        # making a deep copy of the bridge
        # self.bridge = [row[:] for row in bridge] #[:] is slice notation

    def printBridge(self, bridge):
        for row in bridge:
            print(row)

    def genJazzScale(self, tonic):
        # there are 12 notes in total
        # this is the hexatonic scale (blues)
        # could potentially use heptatonic scale for more "major" tone in future

        #should always put in the lowestNote version of tonic
        jazzScale = [tonic, tonic + 3, tonic + 5, tonic + 6, tonic + 7, tonic + 10, tonic + 12,
            tonic + 12 + 3, tonic + 12 + 5, tonic + 12 + 6, tonic + 12 + 7, tonic + 12 +10, tonic + 24]
        return jazzScale
        # note that this assumes 4/4 time, will implement other time signatures in future

    def genNormScale(self, tonic):

        scale = [tonic, tonic + 2, tonic + 4, tonic + 5, tonic + 7, tonic + 9, tonic + 11, tonic + 12,
                tonic + 12, tonic + 12 + 2, tonic + 12 + 4, tonic + 12 + 5, tonic + 12 + 7, tonic + 12 + 9, tonic + 12 + 11, tonic + 12 + 24]

        return scale

    def fitnessCalc(self, bridge, tonic, gene1, gene2):
        melody = bridge[0]

        # print(melody)

        longRest = 0  # neg ten points for rests longer than a half note
        curRestLen = 0

        longNote = 0  # neg ten points for notes longer than a whole note
        curNoteLen = 0

        bridgeNotes = 0  # match complexity to given songs
        bridgeRests = 0
        bridgeHolds = 0
        songNotes = 0
        songRests = 0
        songHolds = 0
        
        #try to stay within range of original song
        highestNote = 0
        lowestNote = 24 #actually this might be 25 but whatever
        outsideRange = 0

        largestInt = 0 #largest interval in the song
        tooLargeInt = 0 #distance of intervals in the bridge that are too far apart

        songOppJump = 0
        bridgeOppJump = 0 #the amount of times the GA jumps from high -> low -> high or low -> high -> low. we want this to happen less

        prevNote1 = None
        prev2Note1 = None

        prevNote2 = None
        prev2Note2 = None
        
        for i in gene1[0]:
            if gene1[0][i] >= 0:
                songNotes += 1

                if gene1[0][i] > highestNote:
                    highestNote = gene1[0][i]
                elif gene1[0][i] < lowestNote:
                    lowestNote = gene1[0][i]

                if prev2Note1 is not None:
                    if (prev2Note1 - prevNote1 < 0 and prevNote1 - gene1[0][i] > 0) or (prev2Note1 - prevNote1 > 0 and prevNote1 - gene1[0][i] < 0):
                        songOppJump += 1
                
                if prevNote1 is not None:
                    if abs(prevNote1 - gene1[0][i]) > largestInt:
                        largestInt = abs(prevNote1 - gene1[0][i])
                
                prevNote1 = gene1[0][i]
                prev2Note1 = prevNote1
                
            elif gene1[0][i] == -1:
                songRests +=1
            elif gene1[0][i] == -2:
                songHolds +=1
            
            if gene2[0][i] >= 0:
                songNotes +=1

                if gene2[0][i] > highestNote:
                    highestNote = gene2[0][i]
                elif gene2[0][i] < lowestNote:
                    lowestNote = gene2[0][i]

                if prev2Note2 is not None:
                    if (prev2Note2 - prevNote2 < 0 and prevNote2 - gene2[0][i] > 0) or (prev2Note2 - prevNote2 > 0 and prevNote2 - gene2[0][i] < 0):
                        songOppJump += 1

                if prevNote2 is not None:
                    if abs(prevNote2 - gene2[0][i]) > largestInt:
                        largestInt = abs(prevNote2 - gene2[0][i])
                
                prevNote2 = gene2[0][i]
                prev2Note2 = prevNote2

            elif gene2[0][i] == -1:
                songRests +=1
            elif gene2[0][i] == -2:
                songHolds +=1

        songNotes /= 2
        songRests /= 2
        songOppJump /= 2
        songHolds /=2

        match = 0 # we want beginning and end of transition to match the song
        

        # rules for jazz

        jazzScale = self.genJazzScale(tonic)
        scale = self.genNormScale(tonic)

        noteOnScale = 0  # one point per note on the jazz scale
        int7 = 0  # two points per major or minor 7th, max four points
        int45 = 0  # one point per perfect fifth or perfect fourth, max four points or something
        stepwise = 0 #two points per maj2, maj3
        impCons = 0 #one point per imperfect consonant, maj6, min3, min6

        noteOnDown = 0  # one point for every note started on 2nd or 4th beat
        # notDone
        noteDiffBar = 0  # one point for every bar with at least two note lengths

        dottedQuarter = 0  # two points for every dotted quarter note, max four points

        restEight = 0  # two points for every eigth rest, max four points
        restQuarter = 0  # two points for every quarter rest, max four points

        bar = 1
        lastBar = bar

        prevNote = None
        prev2Note = None

        for index, val in enumerate(melody):

            if index < len(melody) - 1:
                next = melody[index + 1]
                if (index+1)%16 == 0:
                    bar += 1
            else:
                next = None

            if val == -1:  # rest
                curRestLen += 1
                bridgeRests += 1

                if (next is None) or (next != -1):
                    if curRestLen == 2:
                        restEight += 1
                    elif curRestLen == 4:
                        restQuarter += 1
                    elif curRestLen == 8:
                        longRest += 1

            if val == -2:  # hold
                curNoteLen += 1
                bridgeHolds += 1

                # check for dotted quarter notes
                if (next is None) or (next == -1):
                    if curNoteLen == 6:
                        dottedQuarter += 1
                    elif curNoteLen == 16:
                        longNote += 1

            if val >= 0:  # new note
                curNoteLen = 1
                bridgeNotes += 1

                if val > highestNote or val < lowestNote:
                    outsideRange +=1

                for j in jazzScale:
                    if val == j:
                        noteOnScale += 1

                for k in scale:
                    if val == k:
                        noteOnScale += 1

                if (index % 16 == 4) or (index % 16 == 12):  # each bar has 16 notes
                    noteOnDown += 1

                if prevNote is not None:
                    if (prevNote - val == -1) or (prevNote - val == 11) or (prevNote - val == -2) or (prevNote - val == 10):
                        int7 += 1
                    elif (abs(prevNote - val) == 4) or (abs(prevNote - val) == 5):
                        int45 += 1
                    elif (prevNote - val == 2) or (prevNote - val == 4): 
                        stepwise += 1
                    elif (prevNote - val == 9) or (prevNote - val == 3) or (prevNote - val == 8):
                        impCons += 1

                    if abs(prevNote - val) > largestInt:
                        tooLargeInt += abs(prevNote - val) - largestInt

                # to prevent the constant jumping around in our bridge
                if prev2Note is not None:
                    if (prev2Note - prevNote < 0 and prevNote - val > 0) or (prev2Note - prevNote > 0 and prevNote - val < 0):
                        bridgeOppJump += 1

                if index < 32:
                    if val == gene1[0][index+96]:
                        match += 1
                elif index >= 96:
                    if val == gene2[0][index-96]:
                        match += 1
                elif val == gene1[0][index] or gene2[0][index]:
                        match += 0.5

                prevNote = val
                prev2Note = prevNote

            if next is not None:  # reset current length counters
                if next == -1:
                    curNoteLen = 0
                elif next >= 0:
                    curRestLen = 0
                lastBar = bar

        # for the rules with bounded points (so we don't end up with a bajillion dotted quarter notes)
        dottedQuarter = min(dottedQuarter, 2)
        restEight = min(restEight, 2)
        restQuarter = min(restQuarter, 2)
        int7 = min(int7, 2)
        int45 = min(int45, 2)

        complexity = ((16*8)-abs(songNotes-bridgeNotes))/8 + ((16*8)-abs(songRests-bridgeRests))/8 + ((16*8)-abs(songHolds-bridgeHolds))/16
        #the closer the amount of notes/rests is to the original songs, the more points (for a max of 16, 16, 8 points each)

        jump = 0
        if bridgeOppJump - songOppJump > 0:
            jump = bridgeOppJump - songOppJump
        # print(bar)

        fitness = (longNote + longRest) * (-10) + (outsideRange + bridgeOppJump) * (-3) + (tooLargeInt) * (-0.5) + (noteOnScale + noteOnDown + noteDiffBar + impCons + complexity) * 1 + (dottedQuarter + restEight + restQuarter + int7 + int45 + stepwise + match) * 2

        if fitness < 1:
            fitness = 1  # no negative fitness allowed, not the best fix but will adjust later
        return fitness
