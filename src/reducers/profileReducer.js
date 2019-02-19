import { GET_INICIO, GET_PROFILE, ASYNC_START } from '../constants/actionTypes';

const initialState = {};

export default function datosHomeReducer(state = initialState, action) {
	switch (action.type) {
		case GET_PROFILE:
			return {
				...state,
				loading: false,
				profile: state.profile ? state.profile : action.payload ? action.payload : false
				// error: action.payload.error ? true : false
			};
		case GET_INICIO:
			return {
				...state,
				pedidoFactura: action.payload,
				loading: false
			};
		case ASYNC_START:
			if (action.subtype === GET_PROFILE || action.subtype === GET_INICIO) {
				return { ...state, loading: true };
			}
			break;
		default:
			return { ...state };
	}

	return state;
}
