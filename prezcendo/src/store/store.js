import reducer from './reducer';
import { createStore } from 'redux';
import { GENRES, scaleNotes, scaleTypes } from '../constants';

const initialState = {
    blocks: [],
    bridges: [
        {
            id: 0,
            startBlockID: 0,
            endBlockID: 0,
            currentParameters: {
                happySad:  0.5,
                simpleComplex: 0.5,
                duration: 5 // seconds
            },
            scale: [scaleNotes.C, scaleTypes.NATRUAL],
            previousBars: [], // TBD
            nextBars: [], // TBD
            revisions: [
                /*
                {
                    revisonID: 0,
                    MIDI: [],
                    rating: 
                }
                */
            ]
        }
    ],
    songSettings: {
        bpm: 60,
        timeSignature: [4, 4],
        genre: GENRES.JAZZ
    }
};

export default createStore(reducer, initialState);
