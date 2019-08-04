import React, { Component } from 'react';
import { connect } from 'react-redux';

class WrapperElement extends Component {
    render() {
        return (
            <div className="wrapper-element">
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default connect(
    (state, ownProps) => ({
        ownProps
    }),
    dispatch => ({
    })
)(WrapperElement);