import React, { Component } from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from 'prop-types';
import { ErrorList } from "../../../components/Notify/Messages";
import { validateValue } from "../../../helpers/Helpers";
import { toast } from 'react-toastify';

class AuthorModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            author: {
                first_name: '',
                last_name: ''
            },
            formErrors: {},
            fieldValCondition: {
                first_name: {
                    types: ['required', 'lesslength'],
                    readName: 'Имя',
                    params: {
                        vlength: 20
                    }
                },
                last_name: {
                    types: ['required', 'lesslength'],
                    readName: 'Поле фамилия',
                    params: {
                        vlength: 20
                    }
                }
            }
        }
    }

    validateField = (value, fieldName) => {
        const { fieldValCondition, formErrors } = this.state,
            { params, types, readName, message } = fieldValCondition[fieldName];
        let errors = validateValue(formErrors, value, types, fieldName, readName, params, message);

        this.setState({formErrors: errors})
    };

    nameChange = (e) => {
        const target = e.target;
        this.props.setParentState({selectedAuthor: {...this.props.author, first_name: target.value}}, () => {
            this.validateField(target.value, 'first_name')
        });
    };

    lastnameChange = (e) => {
        const target = e.target;
        this.props.setParentState({selectedAuthor: {...this.props.author, last_name: e.target.value}}, () => {
            this.validateField(target.value, 'last_name')
        });
    };

    saveClick = () => {
        const { fieldValCondition } = this.state,
              { author } = this.props;
        for(var fn in author) {
            if(fieldValCondition[fn]) {
                this.validateField(author[fn], fn)
            }
        }
        this.saveHandl();
    };

    saveHandl = () => {
        const { formErrors } = this.state;

        if (Object.keys(formErrors).length > 0) {
            toast.error(<ErrorList header="Ошибка. Неверно заполнены поля" errors={formErrors} />);
        } else {
            this.props.saveHandler()
        }
    };

    render() {
        const { show, toggleHandler } = this.props,
            author = this.props.author;
        const {formErrors} = this.state;

        return (
            <Modal show={show} onHide={toggleHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Параметры автора</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group controlId="bookName">
                            <Form.Label>Имя</Form.Label>
                            <Form.Control
                                className={formErrors['first_name'] ? 'inp-error' : ''}
                                type="text"
                                placeholder="Введите имя"
                                value={author.first_name}
                                onChange={this.nameChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="bookName">
                            <Form.Label>Фамилия</Form.Label>
                            <Form.Control
                                type="text"
                                className={formErrors['last_name'] ? 'inp-error' : ''}
                                placeholder="Введите фамилию"
                                value={author.last_name}
                                onChange={this.lastnameChange}
                            />
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleHandler}>
                        Закрыть
                    </Button>
                    <Button variant="primary"  onClick={this.saveClick}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
export default AuthorModal;

AuthorModal.propTypes = {
    show: PropTypes.bool,
    toggleHandler: PropTypes.func,
    author: PropTypes.object,
};