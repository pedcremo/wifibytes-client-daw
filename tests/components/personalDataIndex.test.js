import PersonalData from '../../src/components/checkout/childComponents/personalData/index';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {shallow, configure} from 'enzyme';

configure({
  adapter: new Adapter(),
});

const mockStore = configureStore();
const initialState = {
  datosPersonales:
    {
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

const component = shallow(<Provider store={store}><PersonalData/></Provider>);

describe('PersonalDataForm and store', () => {
  it('PersonalData component renders the component correctly', () => {
    expect(component).toHaveLength(1);
  });

  it('We can check if persolaData component called the class constructor', () => {
    expect(component).toMatchSnapshot();
  });

  it('Store snapshot is done', () => {
    expect(store.getActions()).toMatchSnapshot();
  });
});
