'use strict';

import { NOTIFIER_ACTION as ACTION } from '../constants';

const initialState = {
    loading: {
        visibleStatus: false,
        message: 'Loading'
    }
};

export const notifierReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION.CHANGE_LOADING_VISIBLE_STATUS:
            return { ...state, loading: { ...state.loading, visibleStatus: action.payload} };
        case ACTION.CHANGE_LOADING_MESSAGE:
            return { ...state, loading: { ...state.loading, message: action.payload} };
    }

    return state;
};