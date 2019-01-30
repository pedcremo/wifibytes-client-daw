import Catalog from "../../src/components/footer";
import React from 'react';
import {Utils} from '../../src/utils';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import filtros from "../json_endpoints/filtros.json";
import articulo from "../json_endpoints/articulo.json";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../src/utils');
const mockStore = configureStore();
const initialState = {filtros, articulo};
Utils.getUserLang.mockReturnValue("va");

const store = mockStore(initialState);

const catalog = Enzyme.shallow(<Provider store={store}><Catalog /></Provider>);

describe('<Catalog />', () => {
    test('dispatches event to show catalog data', () => {
      expect(catalog).toMatchSnapshot();
      expect(catalog.props().value.storeState.filtros.pantalla[1].num_pantalla).toBe(4);
      expect(catalog.props().value.storeState.articulo.results[0].referencia).toBe("0cab50a1-ea99-4aa4-9a49-1983f06a5614");
      expect(store.getActions()).toMatchSnapshot();
      //expect(catalog.find(Catalog).find('.catalog')).toBe(true);
      console.log(catalog.find(Catalog));
      
    });
  });