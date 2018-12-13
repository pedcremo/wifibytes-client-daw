import Families from '../../src/components/catalog/families';
import React from 'react';
import familia from "../json_endpoints/familia.json";
import {Utils} from '../../src/utils';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../src/utils');

const $ = require('jquery');

beforeEach(() => {
    // Set up our document body
    document.body.innerHTML =
        `<div id="main" class="container-fluid pl-0 pr-0">
        </div>`;
    
});
const json = familia;
Utils.get.mockResolvedValueOnce(json);
Utils.get.mockResolvedValue(json);
const families = Enzyme.shallow(<Families />);

it('We can check if Families component called the class constructor', () => {
    expect(families).toMatchSnapshot();
});

it('Families render must be called and it works properly', () => {
    expect(families.find('.families')).toHaveLength(1);
});

it('We check if data has been printed', () => {
    expect(families.find('.display-3').getElement().props.children).toEqual([175, " € IVA Inc."]);
    expect(families.find('.families-text').getElement().props.children).toEqual("Los mejores terminales del mercado desde");
    expect(families.find('.nav-families').getElement().props.children).toHaveLength(2);
});