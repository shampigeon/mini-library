import { AUTHOR_REQ, AUTHOR_SUCCESS, AUTHOR_UPDATE, AUTHOR_FAILED } from './constant';
// import { mockAuthors } from '../helpers/MockData'

const initialState = {
    authorsList: 'mockAuthors',
    loader: false
};

export default function authorData(state = initialState, action) {
    if(action.type === AUTHOR_REQ) {
        return {
            ...state,
            loader: true,
        };
    } else if(action.type === AUTHOR_SUCCESS) {
        return {
            ...state,
            loader: false,
        }
    } else if(action.type === AUTHOR_FAILED) {
        return {
            ...state,
            loader: false
        }
    } else if(action.type === AUTHOR_UPDATE) {
        return {
            ...state,
            loader: false,
            authorsList: action.payload.authorsList

        }
    }


    return state;
}