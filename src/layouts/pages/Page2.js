import React, { Component } from 'react';
import {connect} from "react-redux";
import {getBooksList, saveBook} from "../../actions/libraryActions";

class Page2 extends Component {

    render() {
        return (
            <div>
                Second
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
)(Page2);