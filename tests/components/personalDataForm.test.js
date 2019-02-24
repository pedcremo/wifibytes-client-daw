import React from 'react';
import PersonalDataForm from '../../src/components/checkout/childComponents/personalData/personalDataForm.js';
import PersonalReducer from '../../src/reducers/personalDataFormReducer';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import * as actionTypes from '../../src/actions/personalDataFormActions';
import Provider from 'react-redux';
import {shallow, configure} from 'enzyme';

/* import { connect } from 'react-redux';
import { shallowWithState } from 'enzyme-redux';
 */
configure({
  adapter: new Adapter(),
});
const mockStore = configureStore();
const initialState = {
  datosPersonales: {
    apellido: 'Goya',
    birthday_omv: '1999-01-10',
    cifnif: '52226723W',
    ciudad: 'Ontinyent',
    codcliente: '47003',
    codpostal: '46870',
    cuenta: 'ES601210041840123456789',
    direccion: 'Gaspar Blai Arbuixec',
    dniFile: 'image/base64:simulandoserunaimagen',
    email: 'example@gmail.com',
    nombre: 'example',
    provincia: 'Ontinyent',
    telefono: '633799372',
    tipo_cliente: '0',
  },
  datosProductos: [],
  erroresDatosPersonales: {
    apellido: null,
    birthday_omv: null,
    cifnif: null,
    ciudad: null,
    codcliente: null,
    codpostal: null,
    cuenta: null,
    direccion: null,
    email: null,
    nombre: null,
    provincia: null,
    telefono: null,
    tipo_cliente: null,
  },
  loaded: false,
  validDatosPersonales: true,
  validDatosProductos: false,
  validForms: false,
};

const store = mockStore(initialState);
const component = shallow(<Provider store={store}><PersonalDataForm/></Provider>);

describe('PersonalDataForm and store', () => {
  it('PersonalDataForm has been rendered correctly', () => {
    expect(component).toHaveLength(1);
  });

  it('We can check if PersonalDataForm component called to its constructor', () =>{
    expect(component).toMatchSnapshot();
  });

  it('Store snapshot is done', () => {
    expect(store.getActions()).toMatchSnapshot();
  });

  it('Store must contain a validForms', () => {
    expect(component.props().value.storeState.validForms).toBe(false);
  });

  it('ValidDatosPersonales must be true', () => {
    expect(component.props().value.storeState.validDatosPersonales).toBe(true);
  });

  it('Store must be initialState', () => {
    expect(component.props().value.storeState).toBe(initialState);
  });
  it('ValidDatosProductos must be false', () => {
    expect(component.props().value.storeState.validDatosProductos).toBe(false);
  });
});

describe('Reducer', () => {
  it('Should return the initial state', () => {
    expect(PersonalReducer(store.getState(), {})).toBe(initialState);
  });

  it('Update state for name', () => {
    expect(PersonalReducer(store.getState(), {
      type: actionTypes.UPDATE_DATOS_PERSONALES,
      field: 'nombre',
      data: 'cesar',
    })).toEqual({
      datosPersonales:
      {
        apellido: 'Goya',
        birthday_omv: '1999-01-10',
        cifnif: '52226723W',
        ciudad: 'Ontinyent',
        codcliente: '47003',
        codpostal: '46870',
        cuenta: 'ES601210041840123456789',
        direccion: 'Gaspar Blai Arbuixec',
        dniFile: 'image/base64:simulandoserunaimagen',
        email: 'example@gmail.com',
        nombre: 'cesar',
        provincia: 'Ontinyent',
        telefono: '633799372',
        tipo_cliente: '0',
      },
      datosProductos: [],
      erroresDatosPersonales: {
        apellido: null,
        birthday_omv: null,
        cifnif: null,
        ciudad: null,
        codcliente: null,
        codpostal: null,
        cuenta: null,
        direccion: null,
        email: null,
        nombre: null,
        provincia: null,
        telefono: null,
        tipo_cliente: null,
      },
      loaded: false,
      validDatosPersonales: true,
      validDatosProductos: false,
      validForms: false,
    });
  });
});
