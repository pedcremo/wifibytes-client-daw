import Catalog from '../../src/components/catalog/catalog';
import React from 'react';
import Enzyme from 'enzyme'
import filtros from "../json_endpoints/filtros.json";
import articulo from "../json_endpoints/articulo.json";
import {Utils} from '../../src/utils';
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

const json1 = filtros;
const json2 = articulo;
Utils.get.mockResolvedValueOnce(json1);
Utils.get.mockResolvedValueOnce(json2);
Utils.get.mockResolvedValue(json1);

it('We can check if Catalog component called the class constructor', () => {
    const catalog = Enzyme.shallow(<Catalog />);
    expect(catalog).toMatchSnapshot();
});

it('Catalog render must be called and it works properly', () => {
    const catalog = Enzyme.shallow(<Catalog />);
    expect(catalog.find('.catalog')).toHaveLength(1);
});