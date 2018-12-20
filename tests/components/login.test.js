import Login from '../../src/components/login/login';
import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
    // Set up our document body
    document.body.innerHTML =
        `<div id="main" class="container-fluid pl-0 pr-0">
        </div>`;
});

it('SignIn component renders the login component correctly', () => {
    const rendered = Enzyme.shallow(<Login />);
    expect(rendered).toHaveLength(1);
});

it('We can check if Login component called the class constructor', () => {
    const login = Enzyme.shallow(<Login />);
    expect(login).toMatchSnapshot();
});

it("When click Change Set Render", () => {
  const login = Enzyme.shallow(<Login />);
  console.log(login.debug());
  login.setState({
      username:"",
      password:"",
      email:"",
      errorCaptcha: "",
      captcha: false,
      error:null
  });
  expect(login.state('username')).toBe("");
  expect(login.state('password')).toBe("");
  expect(login.state('email')).toBe("");
  login.find('#loginButton').simulate('click', login.setState({username : "pepito", password : "123", email:"pepito@gmail.com"}));
  expect(login.state('username')).toBe("pepito");
  expect(login.state('password')).toBe("123");
  expect(login.state('email')).toBe("pepito@gmail.com");
});
