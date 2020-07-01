import types from './types'

export default {
    testAction = function() {
        return {
            type: types.TEST_ACTION,
            payload: {

            }
        }
    }
};