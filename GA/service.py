import time

import mido
from mido import MidiFile
from music21 import *
from music21.note import Note, Rest
from music21.stream import Voice

NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
NOTES_IN_OCTAVE = len(NOTES)


def midi_file_to_input_convention(midi_filename):
    return convert_to_input_convention(convert_to_two_dimensional_array(midi_filename))


# function might need to be changed as based solely on one midi file
def convert_to_two_dimensional_array(midi_filename):
    # parses the midi file to convert it to the music21 format
    # music21 format is SCORE -> PART -> VOICE -> NOTE
    score = converter.parse(midi_filename)
    # iterate through the parts of the score
    for element in score.parts.activeElementList:
        tracks = []
        # iterating through voices of each part
        for part_note_or_rest in element.notesAndRests.activeElementList:
            track = []
            if type(part_note_or_rest) == Voice:
                for note_or_rest in part_note_or_rest.notesAndRests:
                    # if note then add midi note and length, else add rest and length
                    if type(note_or_rest) == Note:
                        track.append([note_or_rest.pitch.midi, float(note_or_rest.quarterLength)])
                    else:
                        track.append([-1, float(note_or_rest.quarterLength)])
            elif type(part_note_or_rest) == Note or type(part_note_or_rest) == Rest:
                # have not seen this scenario yet
                continue
            else:
                # would be like chords
                continue
            tracks.append(track)
        return tracks


# converts number to note with octave
def number_to_note(number: int) -> tuple:
    octave = number // NOTES_IN_OCTAVE
    note = NOTES[number % NOTES_IN_OCTAVE]

    return note, octave


def convert_output_array_to_midi_array(song_notes_for_output):
    s = stream.Stream()
    # iterate through tracks
    for tracks in song_notes_for_output:
        prev_note = 0
        # iterate through output convention array to convert back to midi array
        for track_note in tracks:
            if track_note == -1:
                r = Rest()
                r.quarterLength = 0.25
                s.append(r)
            elif track_note == -2:
                n = Note(prev_note[0] + str(prev_note[1]))
                n.quarterLength = 0.25
                s.append(n)
            else:
                letter_note_array = number_to_note(track_note + 48)
                prev_note = letter_note_array
                n = Note(letter_note_array[0] + str(letter_note_array[1]))
                n.quarterLength = 0.25
                s.append(n)
    return s


# create a midi file by providing name and array to add as input for the file
def create_midi_file(output_midi_array, output_filename):
    mf = midi.translate.streamToMidiFile(output_midi_array)
    mf.open(output_filename, 'wb')
    mf.write()
    mf.close()


def play_midi(output_filename):
    # CODE TO PLAY THE SONG
    with mido.open_output() as output:
        try:
            midi_file = MidiFile(output_filename)
            t0 = time.time()
            for message in midi_file.play():
                print(message)
                output.send(message)
            print('play time: {:.2f} s (expected {:.2f})'.format(
                time.time() - t0, midi_file.length))
        except KeyboardInterrupt:
            print()
            output.reset()


# might need to change as solely based on one test file
def convert_to_input_convention(tracks):
    convention_notes = []
    for track in tracks:
        track_notes_added = []
        for track_note in track:
            music_note = track_note[0] if (track[0] == -1) else track_note[0] - 48
            length = int(track_note[1] / 0.25)
            if length == 1 and -1 < music_note < 25:
                track_notes_added.append(music_note)
            elif length > 1 and -1 < music_note < 25:
                for i in range(length):
                    if i == 0:
                        track_notes_added.append(music_note)
                    else:
                        track_notes_added.append(-2)
            else:
                track_notes_added.append(-1)
        convention_notes.append(track_notes_added)
    return convention_notes
