import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button, Row, Col } from "react-bootstrap";
import { getAuthors, saveAuthor } from "../../actions/authorActions";
import AuthorModal from "../../components/Modals/Author/AuthorModal";
import ConfirmModal from "../../components/Modals/ConfirmModal";
import AuthorsTable from "../../components/Tables/Author/AuthorsTable";
import { toast } from 'react-toastify';

class Authors extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authorModal: false,
            confirmModal: false,
            selectedAuthor: {
                first_name: '',
                last_name: ''
            },
            delId: null
        };
    }

    componentDidMount() {
        this.props.onGetAuthor();
    }

    authorModalToggle = (e) => {
        this.setState({authorModal: !this.state.authorModal})
    };
    confirmModalToggle = (e) => {
        this.setState({confirmModal: !this.state.confirmModal})
    };

    setParentState = (state = {}, callback) => {
        this.setState(state, callback);
    };

    saveHandler = () => {
        const authorsList = [...this.props.authorData.authorsList],
            { selectedAuthor } = this.state;
        let index = authorsList.map(function(e) { return e.id; }).indexOf(Number(this.state.selectedAuthor.id));
        if(index > -1) {
            authorsList[index] = selectedAuthor;
        } else {
            selectedAuthor.id = new Date().getTime();
            authorsList.push(selectedAuthor);
        }

        this.props.onSaveAuthor(authorsList, () => {
            toast.success('Успешно сохранено');
            this.setState({selectedAuthor: {first_name: '', last_name: ''}})
        });
        this.authorModalToggle();
    };

    deleteAuthorHandle = () => {
        if(this.state.delId) {
            const authorsList = [...this.props.authorData.authorsList];
            let index = authorsList.map(function(e) { return e.id; }).indexOf(Number(this.state.delId));
            if(index > -1) {
                authorsList.splice(index, 1);
                this.props.onSaveAuthor(authorsList, () => {
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


    render() {
        const state = this.state,
            { authorData } = this.props;

        return (
            <div>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col md="2"><span className="font-weight-bold">Авторы</span></Col>
                            <Col md="10" className="text-right">
                                <Button variant="success" size="sm" className="btn-fill" onClick={this.authorModalToggle}>
                                    <i className="fa fa-lg fa-plus"/>&nbsp;Добавить автора
                                </Button>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <AuthorsTable list={authorData.authorsList} setParentState={this.setParentState}  />
                    </Card.Body>
                </Card>


                <AuthorModal
                    show={state.authorModal}
                    toggleHandler={this.authorModalToggle}
                    author={state.selectedAuthor}
                    setParentState={this.setParentState}
                    saveHandler={this.saveHandler}
                />

                <ConfirmModal
                    toggleHandler={this.confirmModalToggle}
                    show={state.confirmModal}
                    okCallback={this.deleteAuthorHandle}
                    cancelCallback={() => {}}
                    text="Вы точно хотите удалить автора?"
                />
            </div>
        )
    }
}

export default connect(
    (state, ownProps) => ({
        ownProps,
        authorData: state.authorData,
        libraryData: state.libraryData,
    }),
    dispatch => ({
        onGetAuthor: (filter) => {
            dispatch(getAuthors(filter));
        },
        onSaveAuthor: (data, callback) => {
            dispatch(saveAuthor(data));
            callback();
        },
    })
)(Authors);