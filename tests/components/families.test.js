import Families from '../../src/components/catalog/families';
import familia from "../json_endpoints/familia.json";
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

const families = Enzyme.shallow(<Families familia={familia} />);

it('We can check if Families component called the class constructor', () => {
    expect(families).toMatchSnapshot();
});

it('Families render must be called and it works properly', () => {
    expect(families).toHaveLength(1);
});

it('We check if data has been printed', () => {
    expect(families.find('.display-3').getElement().props.children).toEqual([175, " € IVA Inc."]);
    expect(families.find('.display-1').getElement().props.children).toEqual("Smartphones");
});