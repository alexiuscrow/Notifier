'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeLoadingVisibleStatus, changeLoadingMessage} from '../../store/actions'
import './style.scss'

export class Control extends React.Component {

    handleClick = () => {
        this.props.notifier.loading.changeVisibleStatus(this.props.notifier.loading.visibleStatus);
        this.props.notifier.loading.changeMessage('Loading trunks');
    };

    render() {
        const buttonText = this.props.notifier.loading.visibleStatus ? 'Hide' : 'Show';
        return (
            <div>
                <button onClick={ this.handleClick }>{`${buttonText} loading`}</button>
            </div>
        );
    }
}

const putStateToProps = (state) => {
    return {
        notifier: {
            loading: {
                visibleStatus: state.loading.visibleStatus,
                message: state.loading.message
            }
        }
    }
};

const putActionsToProps = (dispatch) => {
    return {
        notifier: {
            loading: {
                changeVisibleStatus: bindActionCreators(changeLoadingVisibleStatus, dispatch),
                changeMessage: bindActionCreators(changeLoadingMessage, dispatch)
            }
        }
    }
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...stateProps, ...dispatchProps, ...ownProps,
        notifier: {
            loading: {
                ...(stateProps.notifier && stateProps.notifier.loading),
                ...(dispatchProps.notifier && dispatchProps.notifier.loading)
            }
        }
    }
};

export default connect(putStateToProps, putActionsToProps, mergeProps)(Control)

