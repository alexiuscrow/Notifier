'use strict';

import { NOTIFIER_ACTION as ACTION } from '../constants'

export const changeLoadingVisibleStatus = (oldVisibleStatus) => {
    return {
        type: ACTION.CHANGE_LOADING_VISIBLE_STATUS,
        payload: !oldVisibleStatus
    };
};

export const changeLoadingMessage = (message) => {
    return {
        type: ACTION.CHANGE_LOADING_MESSAGE,
        payload: message
    };
};