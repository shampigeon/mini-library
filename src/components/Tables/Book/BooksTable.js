import React, { Component } from 'react';
import { Table } from "react-bootstrap";
import BookTrNormal from './BookTrNormal';
import BookTrBig from './BookTrBig';
import PropTypes from 'prop-types';

class BooksTable extends Component {

    constructor(params) {
        super(params);
        this.state = {
            viewMode: 'normal'
        }
    }


    deleteRowClick = (e) => {
        this.props.setParentState({delId: e.target.dataset.id, confirmModal: true});
    };

    viewModeChange = (mode = 'normal') => {
        this.setState({viewMode: mode})
    };

    render() {
        const { list } = this.props,
            { viewMode } = this.state;

        return (
        <div>
            <div style={{height: '30px'}}>
                <div className="table-params">
                    <i className={`fa fa-th-list fa-lg mt-2 ${viewMode === 'normal' ? 'info-text' : ''}`} onClick={() => {this.viewModeChange('normal')}}/>
                    <i className={`fa fa-th-large fa-lg mt-2 ${viewMode === 'big' ? 'info-text' : ''}`} onClick={() => {this.viewModeChange('big')}}/>
                </div>
            </div>

            <div style={{overflow: 'auto'}}>
                <Table striped bordered hover className="row-36">
                    {viewMode === "big"
                    ? <thead>
                        <tr>
                            <th>Обложка</th>
                            <th>Параметры</th>
                            <th style={{width: '152px'}}/>
                        </tr>
                    </thead>
                    : <thead>
                        <tr>
                            <th style={{ width: '64px'}}/>
                            <th>
                                <span
                                    className="sort-link dropdown-toggle"
                                    title="Сортировать по названию"
                                    onClick={this.props.sortByName}
                                >
                                    Название
                                </span>
                            </th>
                            <th>Автор</th>
                            <th>Страниц</th>
                            <th>Издательство</th>
                            <th style={{width: '55px'}}>
                                <span
                                    className="sort-link dropdown-toggle"
                                    title="Сортировать по году"
                                    onClick={this.props.sortByYear}
                                >
                                    Год&nbsp;
                                </span>
                            </th>
                            <th>Выход в тираж</th>
                            <th>ISBN</th>
                            <th style={{width: '108px',  textAlign: 'center'}} />
                        </tr>
                        </thead>
                    }

                    <tbody>
                    {list.map((item, key) => {
                        if (viewMode === 'big')
                            return <BookTrBig key={key} item={item} deleteClickHandl={this.deleteRowClick} />
                        else
                            return <BookTrNormal key={key} item={item} deleteClickHandl={this.deleteRowClick} />
                    })}
                    </tbody>
                </Table>
            </div>
        </div>
        )
    }
}

export default BooksTable;

BooksTable.propTypes = {
    list: PropTypes.array,
    setParentState: PropTypes.func,
};
