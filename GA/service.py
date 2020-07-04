import time

import mido
from mido import MidiFile

# temporary song
filename = 'VampireKillerCV1.mid'
DEFAULT_TICKS_PER_BEAT = 120


# CODE TO PLAY THE SONG
# with mido.open_output() as output:
#     try:
#         midifile = MidiFile(filename)
#         t0 = time.time()
#         for message in midifile.play():
#             print(message)
#             output.send(message)
#         print('play time: {:.2f} s (expected {:.2f})'.format(
#                 time.time() - t0, midifile.length))
#
#     except KeyboardInterrupt:
#         print()
#         output.reset()

def midi_file_to_input_convention(mid):
    tracks = convert_to_two_dimensional_array(mid)
    convention_notes = convert_to_input_convention(tracks)
    return convention_notes


# go through each msg and when there is a note, add it to the array, do it for each track
def convert_to_two_dimensional_array(mid):
    tracks = []
    for track in mid.tracks:
        notes = []
        for msg in track:
            if vars(msg)['type'] == "note_on":
                notes.append(vars(msg).copy())
        if len(notes) > 0:
            tracks.append(notes)
    return tracks


def convert_to_input_convention(tracks):
    convention_notes = []
    for track in tracks:
        track_notes = []
        for msg in track:
            # for each msg get the length from the time and velocity
            length = msg['time'] * msg['velocity']
            # convert to our convention by subtracting midi by 48 (middle C=60)
            music_note = int(msg['note']) - 48
            # Usually 480 ticks per a beat so to convert to 16th beats, use 120

            # If 16th beat and in our range then put note into array
            if length == DEFAULT_TICKS_PER_BEAT and -1 < music_note < 25:
                track_notes.append(music_note)

            # If greater than 16th beat, see how many 16th beats there are, then run a for loop to add holds
            if length > DEFAULT_TICKS_PER_BEAT and -1 < music_note < 25:
                number_of_notes = int(length / DEFAULT_TICKS_PER_BEAT)
                for i in range(number_of_notes):
                    if i == 0:
                        track_notes.append(music_note)
                    else:
                        track_notes.append(-2)
            # Otherwise, add rests
            else:
                track_notes.append(-1)
        # Add track note array to array with all tracks
        convention_notes.append(track_notes)
    return convention_notes


midi = mido.MidiFile(filename, clip=True)
midi_file_to_input_convention(midi)
