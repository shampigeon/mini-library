import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBooksList, saveBook } from '../../actions/libraryActions';
import { Card, Col, Row } from "react-bootstrap";
import BooksTable from "../../components/Tables/Book/BooksTable";
import { Link } from 'react-router-dom';
import ConfirmModal from "../../components/Modals/ConfirmModal";
import { toast } from 'react-toastify';

class Library extends Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmModal: false,
            delId: null,
            show: false
        };
    }

    componentDidMount() {
        this.props.onGetBooks();
    }

    setParentState = (state = {}) => {
        this.setState(state);
    };
    confirmModalToggle = (e) => {
        this.setState({confirmModal: !this.state.confirmModal})
    };

    deleteBookHandler = () => {
        if(this.state.delId) {
            const bookList = [...this.props.libraryData.bookList];
            let index = bookList.map(function(e) { return e.id; }).indexOf(Number(this.state.delId));
            if(index > -1) {
                bookList.splice(index, 1);
                this.props.onSaveBook(bookList, () => {
                    toast.success('Успешно удалено');
                    this.setState({delId: null})
                });
                this.confirmModalToggle();
            }
        } else {
            toast.error('Нет такого автора');
            this.confirmModalToggle();
        }

    };

    sortByName = () => {
        const bookList = [...this.props.libraryData.bookList];
        bookList.sort(function(a, b){
            if(a.label < b.label) { return -1; }
            if(a.label > b.label) { return 1; }
            return 0;
        })
        this.props.onSaveBook(bookList);
    };

    sortByYear = () => {
        const bookList = [...this.props.libraryData.bookList];
        bookList.sort(function(a, b){
            return a.year < b.year
        });
        this.props.onSaveBook(bookList);
    };

    render() {
        const {libraryData} = this.props,
            { confirmModal } = this.state;

        return (
            <div>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col md="2"><span className="font-weight-bold">Каталог книг</span></Col>
                            <Col md="10" className="text-right">
                                <Link className="btn btn-sm btn-success btn-fill" to="book/0">
                                    <i className="fa fa-lg fa-plus"/>&nbsp;Добавить книгу
                                </Link>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <BooksTable
                            list={libraryData.bookList}
                            setParentState={this.setParentState}
                            sortByName={this.sortByName}
                            sortByYear={this.sortByYear}
                        />
                    </Card.Body>
                </Card>

                <ConfirmModal
                    toggleHandler={this.confirmModalToggle}
                    show={confirmModal}
                    okCallback={this.deleteBookHandler}
                    cancelCallback={() => {}}
                    text="Вы точно хотите удалить книгу из библиотеки?"
                />
            </div>
        )
    }
}

export default connect(
    (state, ownProps) => ({
        ownProps,
        libraryData: state.libraryData,
    }),
    dispatch => ({
        onGetBooks: (filter = '') => {
            dispatch(getBooksList(filter));
        },
        onSaveBook: (data, callback = () => {}) => {
            dispatch(saveBook(data));
            callback();
        }
    })
)(Library);