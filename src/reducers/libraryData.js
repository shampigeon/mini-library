import { BOOKS_REQ, BOOKS_SUCCESS, BOOKS_UPDATE, BOOKS_FAILED } from './constant';
import { mockData } from '../helpers/MockData'

const initialState = {
    bookList: mockData,
    loader: false,
};

export default function libraryData(state = initialState, action) {
    if(action.type === BOOKS_REQ) {
        return {
            ...state,
            loader: true,
        };
    } else if(action.type === BOOKS_SUCCESS) {
        return {
            ...state,
            loader: false,  //FIXME:: переделать получение из хранилища
        }
    } else if(action.type === BOOKS_FAILED) {
        return {
            ...state,
            loader: false
        }
    } else if(action.type === BOOKS_UPDATE) {
        return {
            ...state,
            loader: false,
            bookList: action.payload.bookList,
        }
    }


    return state;
}