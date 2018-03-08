'use strict';

import { NOTIFIER_ACTION as ACTION } from '../constants'

export const show = (opts = {}) => {
    return {
        type: ACTION.SHOW_NOTIFICATION,
        id: opts.id || Date.now(),
        opts: opts
    };
};

export const hide = (id) => {
    return {
        type: ACTION.HIDE_NOTIFICATION,
        id: id,
    };
};

export const hideAll = () => {
    return {
        type: ACTION.HIDE_ALL_NOTIFICATIONS,
    };
};