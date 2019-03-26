import React, { Component } from 'react';
import { Table } from "react-bootstrap";
import AuthorTr from './AuthorTr';
import PropTypes from 'prop-types';

class AuthorsTable extends Component {

    editRowClick = (e) => {
        const author = this.props.list.find(el => el.id === Number(e.target.dataset.id));
        if(author)
            this.props.setParentState({selectedAuthor: author, authorModal: true});
    };
    deleteRowClick = (e) => {
        this.props.setParentState({delId: e.target.dataset.id, confirmModal: true});
    };

    render() {
        const { list } = this.props;

        return (
            <div style={{overflow: 'auto'}}>
                {list.length > 0
                    ?<Table striped bordered hover className="row-36">
                        <thead>
                        <tr>
                            <th style={{width: '108px'}} />
                            <th style={{width: '120px'}}>ID</th>
                            <th>Имя</th>
                            <th>Фамилия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {list.map((item, key) => {
                            return <AuthorTr
                                key={key}
                                item={item}
                                editClickHandl={this.editRowClick}
                                deleteClickHandl={this.deleteRowClick}
                            />
                        })}
                        </tbody>
                    </Table>
                    : <div className="alert alert-info">Нет данных. Добавьте автора</div>
                }
            </div>
        )
    }
}

export default AuthorsTable;

AuthorsTable.propTypes = {
    list: PropTypes.array,
    setParentState: PropTypes.func,
};