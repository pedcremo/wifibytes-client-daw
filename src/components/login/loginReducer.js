import { CHANGE_VIEW, LOGIN, RECOVER, CHANGE_VALUE, ASYNC_END } from '../../constants/actionTypes';

const initialState = {
	view: window.location.href.split('/')[4],
	username: '',
	password: '',
	email: '',
	errorCaptcha: '',
	captcha: false
};
export default function login(state = initialState, action) {
	switch (action.type) {
		case CHANGE_VIEW:
			return {
				...state,
				view: action.view
			};
		case CHANGE_VALUE:
			state[action.target] = action.value;
			return {
				...state
			};
		case LOGIN:
			return {
				...state,
				loading: false,
				error: action.error,
				user: action.payload
			};
		case RECOVER:
			return {
				...state,
				loadingRecover: false,
				messageRecover: action.payload.error ? action.payload.error.message : action.payload.message,
				recoverData: action.payload.recoverData
			};
		default:
			return state;
	}
}
