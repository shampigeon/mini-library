import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ErrorList extends Component {

    render() {
        const { errors, header } = this.props;

        return (
            <div>
                <div style={{fontWeight: 'bold'}}>{header}</div>
                <ul>
                    {Object.keys(errors).map(key => (
                        <li key={key}>
                            {errors[key]}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

ErrorList.propTypes = {
    errors: PropTypes.object,
    header: PropTypes.string,
};





