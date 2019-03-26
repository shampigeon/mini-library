import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import PropTypes from 'prop-types';

class AuthorTr extends Component {



    render() {
        const { item } = this.props;
        return (
            <tr>
                <td>
                    <Button className="right-10 btn-fill" variant="danger" size="xs" data-id={item.id} onClick={this.props.deleteClickHandl}>
                        <i className="fa fa-trash fa-lg fa-lg" data-id={item.id} />
                    </Button>
                    <Button variant="primary" className="btn-fill" size="xs" data-id={item.id} onClick={this.props.editClickHandl}>
                        <i className="fa fa-cogs fa-lg" data-id={item.id} />
                    </Button>
                </td>
                <td>{item.id}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>

            </tr>
        )
    }
}
export default AuthorTr;


AuthorTr.propTypes = {
    item: PropTypes.object,
    deleteClickHandl: PropTypes.func,
    editClickHandl: PropTypes.func,
};