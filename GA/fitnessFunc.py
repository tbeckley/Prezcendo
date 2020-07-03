#class for assessing fitness

class fitnessFunc:
    genre = "Jazz" #default for now, will be enum with different genres later 
    #bridge = [[0]*1]*1

    def __init__(self, genre):
        self.genre = genre
        #making a deep copy of the bridge
        #self.bridge = [row[:] for row in bridge] #[:] is slice notation

    def printBridge(self, bridge):
        for row in bridge:
            print(row)



    

