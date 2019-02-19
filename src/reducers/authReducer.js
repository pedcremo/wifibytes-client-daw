import { AUTH_SET, NOT_AUTH, LOGOUT, GET_PROFILE, ASYNC_START } from '../constants/actionTypes';

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
				user: action.user
			};
		case NOT_AUTH:
			return {
				...state,
				isAuth: false,
				user: undefined
			};
		case LOGOUT:
			return {
				...state,
				isAuth: false,
				user: undefined
			};
		case GET_PROFILE:
			if (action.payload.error)
				return {
					loadgin: false,
					error: true
				};
			return {
				...state,
				loading: false,
				profile: action.payload
			};
		case ASYNC_START:
			return {
				loading: true
			};
		default:
			return state;
	}
}
