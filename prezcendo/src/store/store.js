import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';
import defaultState from './defaultState';

export default createStore(reducer,
    defaultState,
    applyMiddleware(thunk));
