'use strict';

import MainAppContainer from './components/MainAppContainer';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {notifierReducer} from "./store/reducers"

export const store = createStore(notifierReducer);

window.onload = function() {
    ReactDOM.render(<MainAppContainer/>, document.getElementById('root'));
};
