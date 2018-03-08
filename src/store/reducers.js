'use strict';

import {NOTIFIER_ACTION as ACTION} from '../constants';

export const notifierReducer = (state = {notifications: []}, action = {}) => {
    switch (action.type) {
        case ACTION.SHOW_NOTIFICATION:
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    {
                        id: action.id,
                        ...action.opts
                    }
                ]
            };
        case ACTION.HIDE_NOTIFICATION:
            const notifications = state.notifications.filter(notification => {
                return notification.id != action.id;
            });
            return { ...state, notifications: notifications };
        case ACTION.HIDE_ALL_NOTIFICATIONS:
            return { ...state, notifications: [] };
    }
    return state;
};