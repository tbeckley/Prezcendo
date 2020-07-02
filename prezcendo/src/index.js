import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';

import App from './App';

import { Provider } from 'react-redux';
import store from './store/store';

const root = document.getElementById('root');

ReactDOM.render(
    (<Provider store={store}>
        <App />
    </Provider>),
    root
);
