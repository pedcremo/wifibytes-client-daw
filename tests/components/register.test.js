import Register from '../../src/components/login/registerComponent';
import React from 'react'; 
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { configure } from "enzyme";
import {Utils} from '../../src/utils';
import Adapter from "enzyme-adapter-react-16";
import Enzyme from 'enzyme'
configure({ adapter: new Adapter() });
import { shallow, mount, render } from "enzyme";

const $ = require('jquery');
jest.mock('../../src/utils');

it('Register render must be called and it works properly -REGISTER-', () => {
  const registerIns = shallow(<Register />);
  expect(registerIns.render()).toHaveLength(1);
});


it('Register state and set state is called -REGISTER-', () => {
  const registerIns = shallow(<Register />);
  expect(registerIns.state.nombre).toBe(undefined);
  registerIns.setState({nombre:"Moises"})
  expect(registerIns.state('nombre')).toBe("Moises");
});

it('Register render must be called and it does a snapshot -REGISTER-', () => {
  const contactIns = shallow(<Register />);
  expect(contactIns).toMatchSnapshot();
});

