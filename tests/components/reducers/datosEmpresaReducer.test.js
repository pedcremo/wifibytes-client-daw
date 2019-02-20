//import Immutable from 'seamless-immutable';
import uut from '../../../src/reducers/datosEmpresaReducer';
import * as actionTypes from '../../../src/actions/datosEmpresaActions';
import { Reducer } from 'redux-testkit';

const initialState = {
    items: [],
    loading: false,
    error: null
};

describe('store/topics/reducer', () => {

    it('should have initial state', () => {
        expect(uut(initialState, "GET_DATOS_EMPRESA_BEGIN")).toEqual(initialState);
    });
    it('should not affect state', () => {
        Reducer(uut).expect({ type: 'NOT_EXISTING' }).toReturnState(initialState);
    });

    it('should store fetched topics', () => {
        const payload = { datosEmpresa: { t1: 1, t2: 2 } };
        const action = { type: actionTypes.GET_DATOS_EMPRESA_SUCCESS, payload };
        Reducer(uut).expect(action).toReturnState({ "error": null, "items": { "t1": 1, "t2": 2 }, "loading": false });
    });

});