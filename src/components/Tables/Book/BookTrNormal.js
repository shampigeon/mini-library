import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { defImage } from "../../../helpers/Helpers";
import PropTypes from 'prop-types';

class BookTrNormal extends Component {
    render() {
        const { item } = this.props;
        return (
            <tr>
                <td className="td-image-pre">
                    <img
                        src={(item.image && item.image.length > 0) ? item.image : defImage}
                        alt="Обложка"
                        className="img-preview"
                    />
                </td>
                <td><Link to={`/book/${item.id}`}>{item.label}</Link></td>
                <td>{(item.authors && item.authors[0]) ? item.authors[0].label : ''} ...</td>
                <td>{item.page_size}</td>
                <td>{item.publisher}</td>
                <td>{item.year}</td>
                <td>{item.circulation_date}</td>
                <td>{item.isbn}</td>
                <td className="text-center" style={{whiteSpace: 'nowrap'}}>
                    <Button variant="danger" className="btn-fill" size="xs" data-id={item.id} onClick={this.props.deleteClickHandl}>
                        <i className="fa fa-trash fa-lg fa-lg" data-id={item.id} />
                    </Button>
                    <Link className="btn btn-xs btn-primary btn-fill" to={`/book/${item.id}`}><i className="fa fa-cogs fa-lg"/></Link>
                </td>
            </tr>
        )
    }
}
export default BookTrNormal;

BookTrNormal.propTypes = {
    item: PropTypes.object
};

