import { USER_LOGOUT } from '../reducers/constant';
import { combineReducers } from 'redux';
import libraryData from './libraryData';
import authorData from './authorData';

const appReducer = combineReducers({
	authorData,
	libraryData
});

const rootReducer = (state, action) => {
	if (action.type === USER_LOGOUT) {
		state = undefined
	}
	return appReducer(state, action)
};
export default rootReducer;