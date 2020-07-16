import types from './types';
import defaultState from './defaultState';
import { DEFAULT_REVISION } from '../constants';
import * as R from 'ramda';

export default function rootReducer(state = defaultState, action) {
    // TODO - Actually write these functions correctly
    // so I don't have to do this abomination
    // This is really hard. Multiple reducers is the right way but yikes.
    // https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns/
    // FFS I literally made common mistake #2

    const payload = action.payload;

    switch(action.type) {
        case types.CREATE_REVISION: {
            // console.log(state);
            return {
                ...state,
                bridges: {
                    ...state.bridges,
                    [payload.bridgeID]: {
                        ...state.bridges[payload.bridgeID],
                        revisions: R.append( DEFAULT_REVISION , state.bridges[payload.bridgeID].revisions)
                    }
                }
            };
        }
        case types.LOAD_ARRAY_BUFFER: {
            let q = {
                ...state,
                bridges: {
                    ...state.bridges,
                    [payload.bridgeID]: {
                        ...state.bridges[payload.bridgeID],
                        revisions: R.adjust(payload.revisionID,
                            R.assoc('MIDI', payload.arrayBuffer),
                            state.bridges[payload.bridgeID].revisions)
                    }
                }
            };
            return q;
        }
        case types.SELECT_REVISION:
            return {
                ...state,
                interfaceSettings: {
                    ...state.interfaceSettings,
                    modal: {
                        ...state.interfaceSettings.modal,
                        selectedRevision: payload.revisionID
                    }
                }
            };

        case types.LOAD_INSTRUMENTS:
            return {
                ...state,
                instruments: {
                    ...state.instruments,
                    ...payload.instruments
                }
            };
        case types.TEST_ACTION:
            console.log("HELLO WORLD!", payload, JSON.stringify(state)); // eslint disable no-fallthrough
        default:
            return state;
    }
}
