import AddButton from "../../../src/components/cart/AddButton";
import React from 'react';
import Enzyme from 'enzyme'
import { mount , shallow} from 'enzyme'
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16'
import { setItem } from '../../../src/components/cart/cartActions'

window.$ = require('jquery');

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureStore();
const initialState = {
  items: [],
  loading: false,
  error: null
};
const store = mockStore(initialState);


const item = {
  id:15, 
  price:15, 
  description:"Hola", 
}
const props ={
  item : item,
  text:"buy"
}
const rendered = Enzyme.shallow(<AddButton {...props}/>);

describe('<AddButton />', () => {

  it("We can check if AddButton component called the class constructor", () => {
    expect(rendered).toMatchSnapshot();
  });
  
  it("AddButton render must be called and it works properly", () => {
    expect(rendered).toHaveLength(1);
  });
  it("Store must contain a currentStep", () => {
    expect(rendered.instance().props).toEqual(props);
  });
  it(' Dispatches the correct action and payload', () => {
    const selectedActions = [
      {
        type: 'SET_ITEM',
        item : {
          id:15, 
          price:15, 
          description:"Hola", 
          text:"buy"
        },
        localStorageSave: true,
        reducer : "cartReducer",
      },
    ];
    const item = {
      id:15, 
      price:15, 
      description:"Hola", 
      text:"buy"
    }
    store.dispatch(setItem(item));
    expect(store.getActions()).toEqual(selectedActions);
  })
})