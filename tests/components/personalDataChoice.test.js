import UserChoice from '../../src/components/personalData/userChoice';
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

it('userChoice component renders the component correctly', () => {
    const rendered = Enzyme.shallow(<UserChoice />);
    expect(rendered).toHaveLength(1);
});

it('We can check if userChoice component called the class constructor', () => {
    const rendered = Enzyme.shallow(<UserChoice />);
    expect(rendered).toMatchSnapshot();
});