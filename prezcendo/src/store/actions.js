import types from './types';

export default {
    testAction: msg => ({
        type: types.TEST_ACTION,
        payload: msg
    }),
    delayedTestAction: (msg, timeout) =>
        async dispatch => setTimeout(() =>
            dispatch({ type: types.TEST_ACTION, payload: msg }),
        timeout*1000),
    createRevision: (bridgeID, revisionID, rating=null, midi=null) => ({
        type: types.CREATE_REVISION,
        payload: {
            bridgeID,
            revisionID,
            rating,
            midi
        }
    }),
    loadArrayBuffer: (bridgeID, revisionID, promiseToArrayBuffer) =>
        async dispatch => dispatch({
            type: types.LOAD_ARRAY_BUFFER,
            payload: {
                bridgeID,
                revisionID,
                arrayBuffer: await promiseToArrayBuffer
            }
        })
};
