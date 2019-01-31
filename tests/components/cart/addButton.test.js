import AddButton from "../../../src/components/cart/AddButton";
import React from 'react';
import Enzyme from 'enzyme'
import { mount , shallow} from 'enzyme'
<<<<<<< HEAD
import configureStore from 'redux-mock-store';
=======
>>>>>>> e60a24eb75425e799ce2c151a94534a750fcbb2d
import Adapter from 'enzyme-adapter-react-16'
window.$ = require('jquery');

Enzyme.configure({ adapter: new Adapter() });

<<<<<<< HEAD
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
=======
it("We can check if AddButton component called the class constructor", () => {
  const rendered = Enzyme.shallow(<AddButton id={15} price={15} description={"Hola"} text={"buy"}/>);
  expect(rendered).toMatchSnapshot();
});

it("AddButton render must be called and it works properly", () => {
  const wrapper = Enzyme.shallow(<AddButton id={15} price={15} description={"Hola"} text={"buy"}/>);
  const instance = wrapper.instance();
  wrapper.update();
  instance.render();
  console.log(instance.render())
  expect(wrapper.find('button').length).toBe(1);
});

it(' _renderToastrs invoke  _renderToastrs right amount of times', () => {
  const wrapper = Enzyme.shallow(<AddButton id={15} price={15} description={"Hola"} text={"buy"}/>);
  const instance = wrapper.instance();
  instance.addItem = jest.fn();
  wrapper.update();
  instance.render();

  expect(instance.addItem).toHaveBeenCalledTimes(
    instance.addItem.length
  );
})
// it("When click Change Set Render", () => {
//   const rendered = Enzyme.shallow(<AddButton id={15} price={15} description={"Hola"} text={"buy"}/>);
//   rendered.instance()
//   rendered.find('button').simulate('click',{ preventDefault() {} })
//   expect(rendered.state('items').length).toBe(1);
// });
>>>>>>> e60a24eb75425e799ce2c151a94534a750fcbb2d
