import types from './types';
import _ from 'lodash';

export default function rootReducer(initialState = 0, action) {
    // TODO - Actually write these functions correctly
    // so I don't have to do this abomination
    // This is really hard. Multiple reducers is the right way but yikes.
    // https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns/
    // FFS I literally made common mistake #2

    const newState = _.cloneDeep(initialState);

    const payload = action.payload;

    switch(action.type) {
        case types.CREATE_REVISION:
            newState.bridges[payload.bridgeID].revisions.push({
                revisionID: payload.revCount,
                rating: payload.rating,
                starred: payload.starred
            });
            break;
        case types.LOAD_ARRAY_BUFFER:
            newState.bridges[payload.bridgeID].revisions[payload.revisionID].MIDI = payload.arrayBuffer;
            break;
        case types.SELECT_REVISION:
            newState.interfaceSettings.modal.selectedRevision = payload.revID;
            break;
        case types.TEST_ACTION:
            console.log("HELLO WORLD!");
            console.log(payload);
            console.log(JSON.stringify(initialState));
            break;
        default:
            break;
    }

    return newState;
}
