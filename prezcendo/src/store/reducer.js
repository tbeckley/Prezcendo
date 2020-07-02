import types from './types';

export default function rootReducer(initialState = 0, action) {
    const newState = {...initialState};

    const payload = action.payload;

    switch(action.type) {
        case types.CREATE_REVISION:
            newState.bridges[payload.bridgeID].revisions[payload.revisionID] = {
                revisionID: payload.revisionID,
                rating: payload.rating
            };
            break;
        case types.LOAD_ARRAY_BUFFER:
            newState.bridges[payload.bridgeID].revisions[payload.revisionID].MIDI = payload.arrayBuffer;
            break;
        case types.TEST_ACTION:
            console.log("HELLO WORLD!");
            console.log(payload);
            break;
        default:
            break;
    }

    return newState;
}
