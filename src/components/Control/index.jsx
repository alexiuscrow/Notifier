'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {show, hide, hideAll} from '../../store/actions';
import {NOTIFICATION_TYPE} from '../Notifier/NotificationType';
import './style.scss';

export class Control extends React.Component {
    notificationIndexIterator = 0;
    notificationOpt = {
        id: 0,
        message: 'Notifier',
        type: NOTIFICATION_TYPE.LOADER
    };
    state = {selectedNotificationID: null, newNotificationType: null};

    onClickShow = () => {
        this.notificationIndexIterator = (this.notificationIndexIterator + 1);
        const notification = {...this.notificationOpt};
        notification.id = this.notificationIndexIterator;

        if (this.state.newNotificationType !== null)
            notification.type = NOTIFICATION_TYPE[this.state.newNotificationType];

        switch (notification.type) {
            case NOTIFICATION_TYPE.LOADER:
                notification.message = 'Loader';
                break;
            case NOTIFICATION_TYPE.INFO:
                notification.message = 'Info';
                break;
            case NOTIFICATION_TYPE.ERROR:
                notification.message = 'Error';
                break;
            case NOTIFICATION_TYPE.WARNING:
                notification.message = 'Warning';
                break;
            default:
                notification.message = 'Some new notification type'
        }

        this.props.notifier.show(notification);
    };
    onClickHide = () => {
        const selectedNotificationID = this.state.selectedNotificationID;
        if (selectedNotificationID !== null)
            this.props.notifier.hide(selectedNotificationID);
    };
    onChangeNotificationTypeSelect = (e) => {
        const newNotificationType = e.target.value;
        this.setState({newNotificationType: newNotificationType});
    };
    onChangeNotificationsSelect = (e) => {
        const notificationId = e.target.value;
        this.setState({selectedNotificationID: notificationId});
    };


    render() {
        return (
            <div className='control'>
                <fieldset>
                    <legend>Adding</legend>
                    <select name="newNotificationType" id="newNotificationType" onChange={this.onChangeNotificationTypeSelect}>
                        {Object.keys(NOTIFICATION_TYPE).map(function(notificationTypeKey, index) {
                            return <option value={notificationTypeKey} key={index}>{notificationTypeKey}</option>;
                        })}
                    </select>
                    <button onClick={ this.onClickShow }>Add notification</button>
                </fieldset>
                <fieldset>
                    <legend>Removing</legend>
                    <select name="notifications" id="notifications" onChange={this.onChangeNotificationsSelect}
                            size={this.props.notifier.notifications.length}>
                        {this.props.notifier.notifications.map((notification, index) => {
                            return (
                            <option value={notification.id} key={index}>
                                {`#${notification.id} - ${notification.type.toString()}`}
                            </option>
                            );
                        })}
                    </select>
                    <button onClick={this.onClickHide}>Hide notification</button>
                </fieldset>
            </div>
        );
    }
}

const putStateToProps = (state) => {
    return {
        notifier: {
            notifications: state.notifications
        }
    }
};

const putActionsToProps = (dispatch) => {
    return {
        notifier: {
            show: bindActionCreators(show, dispatch),
            hide: bindActionCreators(hide, dispatch),
            hideAll: bindActionCreators(hideAll, dispatch)
        }
    }
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...stateProps, ...dispatchProps, ...ownProps,
        notifier: {
            ...(stateProps.notifier && stateProps.notifier),
            ...(dispatchProps.notifier && dispatchProps.notifier)
        }
    }
};

export default connect(putStateToProps, putActionsToProps, mergeProps)(Control)

