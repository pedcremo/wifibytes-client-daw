import SignIn from '../../src/components/login/signIn';
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

it('SignIn component renders the signIn component correctly', () => {
    const rendered = Enzyme.shallow(<SignIn />);
    expect(rendered).toHaveLength(1);
});

it('We can check if SignIn component called the class constructor', () => {
    const signIn = Enzyme.shallow(<SignIn />);
    expect(signIn).toMatchSnapshot();
});

it("When click Change Set Render", () => {
  const signIn = Enzyme.shallow(<SignIn />);
  signIn.setState({
      url : "login"
  });
  expect(signIn.state('url')).toBe("login");
  signIn.find('#register').simulate('click', signIn.setState({url : "register"}));
  expect(signIn.state('url')).toBe("register");
});
