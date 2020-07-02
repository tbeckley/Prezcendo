import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { GENRES, SCALE_NOTES, SCALE_TYPES } from '../constants';
import reducer from './reducer';

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
            scale: [SCALE_NOTES.C, SCALE_TYPES.NATRUAL],
            previousBars: [], // TBD
            nextBars: [], // TBD
            revisions: []
        }
    ],
    songSettings: {
        bpm: 60,
        timeSignature: [4, 4],
        genre: GENRES.JAZZ
    }
};

export default createStore(reducer,
    initialState,
    applyMiddleware(thunk));
