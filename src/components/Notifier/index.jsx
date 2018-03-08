'use strict';

import React from 'react';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {show, hide, hideAll} from '../../store/actions';
import {NOTIFICATION_TYPE} from '../Notifier/NotificationType';
import {bindActionCreators} from 'redux';
import './style.scss';

export class Notifier extends React.Component {

    getIconClassName = (type) => {
        switch (type) {
            case NOTIFICATION_TYPE.LOADER:
                return 'loader-circle';
            case NOTIFICATION_TYPE.ERROR:
                return 'stick error-stick';
            case NOTIFICATION_TYPE.WARNING:
                return 'stick warning-stick';
            default:
                return 'stick info-stick';
        }
    };

    addDelayedHiding = () => {
        this.props.notifications.forEach((notification) => {
            if (notification.type !== NOTIFICATION_TYPE.LOADER && !notification.isTimerAdded) {
                notification.isTimerAdded = true;
                setTimeout(() => {
                    this.props.hide(notification.id);
                }, this.props.delayToHiding || 10000);
            }
        }, this);
    };

    componentDidMount() {
        this.addDelayedHiding();
    }

    componentDidUpdate() {
        this.addDelayedHiding();
    }

    render() {
        const notificationElements = this.props.notifications.map((notification) => {
            let iconClassName = this.getIconClassName(notification.type);
            return (
                <div className="notification-wrapper" key={notification.id}>
                    <div className='notification'>
                        <div className='icon-container'>
                            <div className={iconClassName}/>
                        </div>
                        <div className='notification-msg'>{notification.message}</div>
                    </div>
                </div>
            );
        }, this);
        return (
            <div className='notifier'>
                <ReactCSSTransitionGroup className='container' transitionName='break-into'
                                         transitionEnterTimeout={1300} transitionLeaveTimeout={1900}>
                    {notificationElements}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

const putStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        notifications: state.notifications
    };
};

const putActionsToProps = (dispatch) => {
    return {
        show: bindActionCreators(show, dispatch),
        hide: bindActionCreators(hide, dispatch),
        hideAll: bindActionCreators(hideAll, dispatch)
    };
};

export default connect(putStateToProps, putActionsToProps)(Notifier);