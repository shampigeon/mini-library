import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { defImage } from "../../../helpers/Helpers";
import PropTypes from 'prop-types';

class BookTrBig extends Component {
    render() {
        const { item } = this.props;
        return (
        <tr>
            <td className="td-image-big">
                <img
                    src={(item.image && item.image.length > 0) ? item.image : defImage}
                    alt="Обложка"
                    className="img-big"
                />
            </td>
            <td className="td-info">
                <div><span>Заголовок: </span><Link to={`/book/${item.id}`}>{item.label}</Link></div>
                <div><span>Автор: </span>{(item.authors && item.authors[0]) ? item.authors[0].label : ''} ...</div>
                <div><span>Кол-во страниц: </span>{item.page_size}</div>
                <div><span>Издательство: </span>{item.publisher}</div>
                <div><span>Год: </span>{item.year}</div>
                <div><span>Дата публикации: </span>{item.circulation_date}</div>
                <div><span>ISBN: </span>{item.isbn}</div>
            </td>
            <td className="text-center">
                <Button variant="danger" className="btn-fill" data-id={item.id} onClick={this.props.deleteClickHandl}>
                    <i className="fa fa-trash fa-lg fa-lg" data-id={item.id} />
                </Button>
                <Link className="btn btn-primary btn-fill" to={`/book/${item.id}`}><i className="fa fa-cogs fa-lg"/></Link>
            </td>
        </tr>
        )
    }
}
export default BookTrBig;

BookTrBig.propTypes = {
    item: PropTypes.object
};


