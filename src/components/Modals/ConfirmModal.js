import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from "react-bootstrap";


class ConfirmModal extends Component {
    okClick = () => {
        this.props.okCallback();
    };

    cancelClick = () => {
        this.props.cancelCallback();
        this.props.toggleHandler();
    };

    render() {
        const props = this.props,
            text = props.text ? props.text : "Подтвердите действие",
            title = props.title ? props.title : "Подтвердите действие";

        return (
            <Modal show={props.show} onHide={props.toggleHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {text}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.cancelClick}>
                        Отмена
                    </Button>
                    <Button variant="primary"  onClick={this.okClick}>
                        Ок
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ConfirmModal;



ConfirmModal.propTypes = {
    text: PropTypes.string,
    title: PropTypes.string,
    show: PropTypes.bool,
    toggleHandler: PropTypes.func,
    cancelCallback: PropTypes.func,
};
