import Footer from "../../src/components/footer";
import datosEmpresaJSON from '../json_endpoints/datos_empresa.json';
import homeJSON from "../json_endpoints/home.json";
import React from 'react';
import {Utils} from '../../src/utils';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../src/utils');
const mockStore = configureStore();
const initialState = {datosEmpresaJSON, homeJSON};
Utils.getUserLang.mockReturnValue("va");

const store = mockStore(initialState);

const footer = Enzyme.shallow(<Provider store={store}><Footer /></Provider>);

describe('<Footer />', () => {
  test('dispatches event to show footer data', () => {
    expect(footer).toMatchSnapshot(); 
    console.log(footer.props().value.storeState.homeJSON);
    expect(footer.props().value.storeState.datosEmpresaJSON.name).toMatch(/Wifibytes S.L/);
    expect(footer.props().value.storeState.homeJSON[0].titulo).toMatch(/Wifibytes/);
    expect(footer.props().value.storeState.homeJSON[1].caja_izquierda_texto).toMatch(/Do you want to cancel subscription?/);
    expect(footer.props().value.storeState.datosEmpresaJSON.textos).toHaveLength(13);
    expect(store.getActions()).toMatchSnapshot();
    
  });
});



/*describe('<footer />', () => {

  it("We can check if Footer component called the class constructor", () => {
    expect(footer).toMatchSnapshot();
  });
  
  it("Footer render must be called and it works properly", () => {
      expect(footer.find('.footer-copyright').exists()).toBe(true);
      expect(footer.find('#companyName').getElement().props.children).toBe("Wifibytes S.L");
      expect(footer.find('.left_box').getElement().props.dangerouslySetInnerHTML.__html).toMatch(/<p>Vols donar-te de baixa/);
  });
});*/
