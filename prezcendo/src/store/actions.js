import types from './types';
import { getObjectFromArray, getInstrumentsToAdd } from '../helpers/midiHelper';


export default {
    testAction: msg => ({
        type: types.TEST_ACTION,
        payload: msg
    }),
    delayedTestAction: (msg, timeout) => async dispatch => setTimeout(() =>
            dispatch({ type: types.TEST_ACTION, payload: msg }),
            timeout*1000),
    createRevision: (bridgeID, revisionID = null, rating=null, midi=null) => ({
        type: types.CREATE_REVISION,
        payload: {
            bridgeID,
            revisionID,
            rating,
            midi
        }
    }),
    setCurrentBridge: (revisionID, childID ) => ({
        type: types.SET_CURRENT_BRIDGE,
        payload: {
            revisionID,
            childID,
        }
    }),
    setSelectedTransition: (revisionID, childID) => ({
        type: types.SELECT_TRANSITION,
        payload: {
            revisionID,
            childID,
        }
    }),
    handleMIDI: (bridgeID, revisionID, promiseToArrayBuffer) =>
        async (dispatch, getState) => {
            const arrayBuffer = await promiseToArrayBuffer;

            dispatch({
                type: types.LOAD_ARRAY_BUFFER,
                payload: {
                    bridgeID,
                    revisionID,
                    arrayBuffer
                }
            });

            dispatch({
                type: types.LOAD_INSTRUMENTS,
                payload: {
                    instruments: getInstrumentsToAdd(getState().instruments, getObjectFromArray(arrayBuffer))
                }
            });
        }
};
