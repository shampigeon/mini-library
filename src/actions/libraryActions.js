import { BOOKS_SUCCESS, BOOKS_UPDATE } from '../reducers/constant';

export function getBooksList() {
    return dispatch => {
        dispatch({type: BOOKS_SUCCESS, payload: {}}); // Эмитация запроса на сервер
    }
};

export function saveBook(data) {
    return dispatch => {
        dispatch({type: BOOKS_UPDATE, payload: {bookList: data}});
    }
};