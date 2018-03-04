'use strict';

import React from 'react';
import {connect} from 'react-redux';
import './style.scss';

export class Notifier extends React.Component {
    render() {
        let loaderClassName = 'loader';
        if (this.props.loading.visibleStatus)
            loaderClassName += ' visible';

        return (
            <div className={loaderClassName}>
                <div className="icon">
                    <div className="circle"/>
                </div>
                <div className="loader-msg">{this.props.loading.message}</div>
            </div>
        )
    }
}

const putStateToProps = (state, ownProps) => {
    return {
        loading: {
            visibleStatus: ownProps.visibleStatus || (ownProps.loading && ownProps.loading.visibleStatus) || state.loading.visibleStatus,
            message: ownProps.message || (ownProps.loading && ownProps.loading.message) || state.loading.message
        }
    }
};

export default connect(putStateToProps)(Notifier)