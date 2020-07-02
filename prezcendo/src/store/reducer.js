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
