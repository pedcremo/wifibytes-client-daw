// eslint-disable-next-line max-len
import PortabilidadForm from '../../src/components/checkout/childComponents/personalData/portabilidadForm';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {shallow, configure} from 'enzyme';
import * as actionTypes from '../../src/actions/personalDataFormActions';
import PersonalReducer from '../../src/reducers/personalDataFormReducer';

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
    cuenta: 'ES6621000418401234567891',
    direccion: 'Gaspar Blai Arbuixec',
    dniFile: 'image/base64:simulandoserunaimagen',
    email: 'example@gmail.com',
    nombre: 'example',
    provincia: 'Ontinyent',
    telefono: '633799372',
    tipo_cliente: '0',
  },
  datosProductos: [{
    0 : {
      key: '1_0_0',
      idTarifa: 3,
      idSubtarifa: 1,
      tipo: 'portabilidad',
      tipoTlf: 'movil',
      numTlf: '633799372',
      sim: '4450123412341234',
      compania: 'Orange',
      description: 'MOVIL ILIMITADAS + 3GB',
    }}],
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
  validDatosPersonales: false,
  validDatosProductos: true,
  validForms: false,
};

const store = mockStore(initialState);
const component = shallow(<Provider store={store}><PortabilidadForm/></Provider>);

describe('<PortabilidadForm />', () => {
  it('PortabilidadForm snapshot is done', () => {
    expect(component).toMatchSnapshot();
  });

  it('PortabilidadForm render must be called and it works properly', () => {
    expect(component).toHaveLength(1);
  });

  it('Store snapshot is done', () => {
    expect(store.getActions()).toMatchSnapshot();
  });

  it('Store must contain a currentStep', () => {
    expect(component.props().value.storeState.validDatosProductos).toBe(true);
  });
}),

describe('Reducer', () => {
  it('Should return the initial state', () => {
    expect(PersonalReducer(store.getState(), {})).toBe(initialState);
  });
});
