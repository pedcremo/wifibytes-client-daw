import IncrementButtons from "../../../src/components/cart/IncrementButtons";
import React from 'react';
import Enzyme from 'enzyme';
import { mount , shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import * as cartActions from '../../../src/constants/actionTypes';
import { quantityItem, delete_item } from '../../../src/components/cart/cartActions'
window.$ = require('jquery');

Enzyme.configure({ adapter: new Adapter() });
const initialState = {
  item: "",
  quantity: 0
};
const mockStore = configureStore();
const rendered = Enzyme.shallow(<IncrementButtons item={'Paco El Maco'} quantityItem={"quantityItem"} function={"delete_item"}/>);


it("We can check if IncrementButtons component called the class constructor", () => {
  const rendered = Enzyme.shallow(<IncrementButtons item={'Paco El Maco'} quantityItem={"quantityItem"} function={"delete_item"} />);
  expect(rendered).toMatchSnapshot();
});

it("IncrementButtons render must be called and it works properly", () => {
  expect(rendered).toHaveLength(1);
});

it(' Dispatches the correct action and payload, delete_item', () => {
  const store = mockStore(initialState);
  const selectedActions2 = [
    {
      type: 'DEL_ITEM',
      item: '1234',
      localStorageUpdate: true,
      reducer: "cartReducer"
    }
  ];
  console.log(selectedActions2);
  store.dispatch(delete_item('1234'));
  expect(store.getActions()).toEqual(selectedActions2);
});
it(' Dispatches the correct action and payload', () => {
  const store = mockStore(initialState);
  const selectedActions = [
    {
      item: '1234',
      quantity: 1,
      localStorageSave: true,
      type: "SET_QUANTITY",
      reducer: "cartReducer"
    }
  ];
  store.dispatch(quantityItem('1234', 1));
  expect(store.getActions()).toEqual(selectedActions);
});
