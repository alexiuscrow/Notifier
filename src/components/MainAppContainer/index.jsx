'use strict';

import React from 'react';
import {Provider} from 'react-redux';
import Notifier from '../Notifier';
import Control from '../Control'
import { store } from '../../app'
import './style.scss';

export default class MainAppContainer extends React.Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                    <Control/>
                </Provider>
                <Provider store={store}>
                    <Notifier/>
                </Provider>
            </div>
        );
    }
}