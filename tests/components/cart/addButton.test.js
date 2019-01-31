import AddButton from "../../../src/components/cart/AddButton";
import React from 'react';
import Enzyme from 'enzyme'
import { mount , shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
window.$ = require('jquery');

Enzyme.configure({ adapter: new Adapter() });

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
