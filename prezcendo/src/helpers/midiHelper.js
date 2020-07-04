import { Midi } from '@tonejs/midi';
import Tone from 'tone';

import * as R from 'ramda';

export async function responseToArrayBuffer(resp) {
  return await (await resp.blob()).arrayBuffer();
}

export const getObjectFromArray = arrayBuffer => new Midi(arrayBuffer);

export const getMaxLength = (music) => Math.max(...R.map(
        R.pipe(R.props(['time', 'duration'], R.__), R.sum),
        R.filter(R.pipe(R.isNil, R.not), R.map(
        R.pipe(R.prop('notes'), R.last), music.tracks))));

export async function playMusic(music, onceComplete = null) {
    await Tone.start(); // TODO - Is running
    Tone.Transport.stop();

    const synth = new Tone.Synth().toMaster();
    synth.sync();

    for (let track of music.tracks)
        for (let note of track.notes)
            synth.triggerAttackRelease(note.name, note.duration, note.time);

    Tone.Transport.scheduleOnce(() => {
        Tone.Transport.emit('cleanup');
        onceComplete();
    }, getMaxLength(music));

    Tone.Transport.start();

    Tone.Transport.on('cleanup', () => {
        synth.triggerRelease();

        Tone.Transport.scheduleOnce(() => {
            Tone.Transport.stop();
        }, (Tone.Transport.seconds + 0.1));
    });
}

export async function stopMusic() {
    Tone.Transport.cancel();
    Tone.Transport.emit('cleanup');
}

export const isPlaying = () => Tone.Transport.status == 'status';
