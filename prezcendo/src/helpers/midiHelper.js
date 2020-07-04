import { Midi } from '@tonejs/midi';
import Tone from 'tone'; //eslint-disable-line

export async function responseToArrayBuffer(resp) {
    return await (await resp.blob()).arrayBuffer();
}

export const getObjectFromArray = arrayBuffer => new Midi(arrayBuffer);

export async function playMusic(music) {
    await Tone.start();

    const synth = new Tone.Synth().toMaster();
    const newTransport = new Tone.Transport();

    console.log(newTransport);

    synth.sync();

    for (let track of music.tracks)
    {
        for (let note of track.notes) {
            synth.triggerAttackRelease(note.name, note.duration, note.time);
        }
    }

    newTransport.start();

}