import { Midi } from "@tonejs/midi";
import Tone from "tone";

import * as R from "ramda";

import { getBaseURL } from "./webHelper";

// Helpers for construction
export async function responseToArrayBuffer(resp) {
  return await (await resp.blob()).arrayBuffer();
}

export const getObjectFromArray = (arrayBuffer) => new Midi(arrayBuffer);

// Match up track names to our names - Logic TBD
export function getInstrumentName (instrument) {
  switch(instrument) {
    default:
      return "piano"; // For now, everything is a piano
  }
}

export const getInstrumentFromTrack = R.pipe(R.path(["instrument", "name"]), getInstrumentName);

export function getInstrumentsToAdd(existingInstruments, music) {
  const requiredInstruments = R.uniq(R.map(getInstrumentFromTrack, music.tracks));
  const toCreate = R.difference(requiredInstruments, R.keys(existingInstruments)); // Find required items that are not loaded

  const BASE_URL = getBaseURL();

  return R.fromPairs(R.transpose([toCreate, R.map(instrument =>
    new Tone.Sampler(generateSourceMap(".ogg"), () => {}, `${BASE_URL}/samples/${instrument}/`).toMaster(), toCreate)]));
}

export function generateSourceMap(extesion=".ogg") {
  const notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
  const nums = R.map(R.toString, R.range(1, 7));

  let fullNotes = R.map(R.reduce(R.concat, ""), R.xprod(notes, nums));

  return R.fromPairs(R.transpose([fullNotes, R.map(R.pipe(R.concat(R.__, extesion), R.replace("#", "s")), fullNotes)]));
}

// Music controls
export async function playMusic(music, onceComplete = null, instruments = {}) {
  await Tone.start(); // TODO - Is running

  Tone.Transport.stop(); // I shouldn't need this, keeping for safety

  const requiredInstruments = R.props(R.uniq(R.map(getInstrumentFromTrack, music.tracks)), instruments);

  // Sync all the instruments
  requiredInstruments.map(i => i.sync());

  // Prepare the cleanup
  const cleanupFunctions = ["releaseAll", "unsync"];
  const onCleanup = R.map(i => (() => i[0][i[1]]()), R.xprod(requiredInstruments, cleanupFunctions));

  for (let track of music.tracks)
  {
    let instrument = instruments[getInstrumentFromTrack(track)];
    for (let note of track.notes)
      instrument.triggerAttackRelease(note.name, note.duration, note.time);
  }

  Tone.Transport.scheduleOnce(() => {
    stopMusic();
    onceComplete();
  }, getMaxLength(music));

  let qq = Tone.Transport; // eslint-disable-line

  Tone.Transport.start();

  Tone.Transport.on("cleanup", () => {
    R.map(R.call, onCleanup);

    Tone.Transport.scheduleOnce(() => {
      Tone.Transport.stop();
    }, Tone.Transport.seconds + 0.1);
  });
}

export async function stopMusic() {
  Tone.Transport.cancel();
  Tone.Transport.emit("cleanup");
}

// Music status info
export const isPlaying = () => Tone.Transport.status == "status";

export function getPlaybackTime() {
  return Tone.Transport.state == "stopped" ? 0 : Tone.Transport.getSecondsAtTime();
}

export const getMaxLength = (music) => Math.max(
  ...R.map(R.pipe(R.props(["time", "duration"], R.__), R.sum),
  R.filter(R.pipe(R.isNil, R.not), R.map(R.pipe(R.prop("notes"), R.last), music.tracks))));


// MIDI Generation
export function generateMidi (sequenceData) {
  let midi = new Midi();

  const scale = ["C3", "D3", "E3", "F3", "G3", "A4", "B4", "C4" ];

  const beatTime = 0.5;

  for(const track of sequenceData.tracks) {
    let midiTrack = midi.addTrack();
    midiTrack.instrument = track.instrument;


    for(const note of track.notes) {
      let obj = {
        name: scale[note.note],
        time: beatTime * note.time,
        duration: beatTime
      };

      midiTrack.addNote(obj);
    }
  }

  return new Buffer(midi.toArray()); // eslint-disable-line no-undef
}

