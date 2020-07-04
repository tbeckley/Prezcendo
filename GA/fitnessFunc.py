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
        scale = [tonic, tonic + 3, tonic + 5, tonic + 6, tonic + 7, tonic + 10, tonic + 12]
        return scale

        # note that this assumes 4/4 time, will implement other time signatures in future

    def fitnessCalc(self, bridge, tonic):
        melody = bridge[0]

        # print(melody)

        longRest = 0  # neg ten points for rests longer than a half note
        curRestLen = 0

        longNote = 0  # neg ten points for notes longer than a whole note
        curNoteLen = 0

        # not done
        uniqueNoteBar = [0, 0, 0, 0, 0, 0, 0, 0]  # two points for every bar with at least two different pitches
        # not done
        totalNotes = [0, 0, 0, 0, 0, 0, 0, 0]  # neg 10 points for bars with over 8 notes

        # rules for jazz

        scale = self.genJazzScale(tonic)

        noteOnScale = 0  # one point per note on the jazz scale
        int7 = 0  # two points per dominant 7th, max four points
        int45 = 0  # one point per perfect fifth or perfect fourth, max four points or something

        noteOnDown = 0  # one point for every note started on 2nd or 4th beat
        # notDone
        noteDiffBar = 0  # one point for every bar with at least two note lengths

        dottedQuarter = 0  # two points for every dotted quarter note, max four points

        restEight = 0  # two points for every eigth rest, max four points
        restQuarter = 0  # two points for every quarter rest, max four points

        prevNote = None

        for index, val in enumerate(melody):

            if index < len(melody) - 1:
                next = melody[index + 1]
            else:
                next = None

            if val == -1:  # rest
                curRestLen += 1

                if (next is None) or (next != -2):
                    if curRestLen == 2:
                        restEight += 1
                    elif curRestLen == 4:
                        restQuarter += 1
                    elif curRestLen == 8:
                        longRest += 1

            if val == -2:  # hold
                curNoteLen += 1

                # check for dotted quarter notes
                if (next is None) or (next == -2):
                    if curNoteLen == 6:
                        dottedQuarter += 1
                    elif curNoteLen == 16:
                        longNote += 1

                if prevNote is not None:
                    if (prevNote - val == 1) or (prevNote - val == -11):
                        int7 += 1
                    if (abs(prevNote - val) == 4) or (abs(prevNote - val) == 5):
                        int45 += 1
                prevNote = val

            if val >= 0:  # new note
                curNoteLen = 1

                for j in scale:
                    if val == j:
                        noteOnScale += 1

                if (index % 16 == 4) or (index % 16 == 12):  # each bar has 16 notes
                    noteOnDown += 1

            if next is not None:  # reset current length counters
                if next == -1:
                    curNoteLen = 0
                elif next >= 0:
                    curRestLen = 0

        # for the rules with bounded points (so we don't end up with a bajillion dotted quarter notes)
        dottedQuarter = min(dottedQuarter, 2)
        restEight = min(restEight, 2)
        restQuarter = min(restQuarter, 2)
        int7 = min(int7, 2)
        int45 = min(int45, 2)

        fitness = (longNote + longRest) * (-10) + (noteOnScale + noteOnDown + noteDiffBar) * 1 + (
                dottedQuarter + restEight + restQuarter + int7 + int45) * 2
        if fitness < 1:
            fitness = 1  # no negative fitness allowed, not the best fix but will adjust later
        return fitness

        # TODO: actually compute and return the fitness value
