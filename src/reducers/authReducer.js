import { AUTH_SET, NOT_AUTH, LOGOUT, ASYNC_START, ASYNC_END } from '../constants/actionTypes';

const initialState = {
	isAuth: false,
	user: null
};

export default function isAuth(state = initialState, action) {
	switch (action.type) {
		case AUTH_SET:
			return {
				...state,
				isAuth: true,
				user: action.user,
				loading: false
			};
		case NOT_AUTH:
			return {
				...state,
				isAuth: false,
				user: undefined,
				loading: false
			};
		case ASYNC_START:
			if (action.subtype === AUTH_SET) {
				return { ...state, loading: true };
			}
			break;
		case LOGOUT:
			return {
				...state,
				isAuth: false,
				user: undefined
			};

		default:
			return { ...state };
	}

	return state;
}
