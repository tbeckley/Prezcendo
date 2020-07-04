import { Midi } from '@tonejs/midi';
import Tone from 'tone'; //eslint-disable-line

export async function responseToArrayBuffer(resp) {
  return await (await resp.blob()).arrayBuffer();
}

export const getObjectFromArray = arrayBuffer => new Midi(arrayBuffer);

export async function playMusic(music) {
    await Tone.start();

    const synth = new Tone.Synth().toMaster();

    synth.sync();

    for (let track of music.tracks)
        for (let note of track.notes)
            synth.triggerAttackRelease(note.name, note.duration, note.time);

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
