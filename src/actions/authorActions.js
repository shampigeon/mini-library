import { AUTHOR_SUCCESS, AUTHOR_UPDATE } from '../reducers/constant';

export function getAuthors() {
    return dispatch => {
        dispatch({type: AUTHOR_SUCCESS, payload: {}}); // Эмитация запроса на сервер
    }
};

export function saveAuthor(data) {
    return dispatch => {
        dispatch({type: AUTHOR_UPDATE, payload: {authorsList: data}});
    }
};