import Filters from '../../src/components/catalog/filters';
import filtros from '../json_endpoints/filtros.json';
import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
    // Set up our document body
    document.body.innerHTML =
        `<div id="main" class="container-fluid pl-0 pr-0">
        </div>`;
});

it('Filters component renders the Filters correctly', () => {
    const rendered = renderer.create(<Filters filters={filtros} />);
    expect(rendered.toJSON()).toMatchSnapshot();
});

it("Filters render must be called and it works properly", () => {
    const filters = Enzyme.shallow(<Filters filters={filtros} />);
    expect(filters).toHaveLength(1);
});

it("Check if there are exactly 5 filters", () => {
    let filters = shallow(<Filters filters={filtros} />);
    expect(filters.find("select.form-control").length).toBe(5);
});

it("Check if the dropdowns are not empty", () => {
    let filters = shallow(<Filters filters={filtros} />);
    const texts = filters.find('label').map(node => node.text());
    expect(texts).toEqual(['Screen:', 'CPU:', 'RAM:', 'Brand:', 'Camera:']);
});

it("Check if there exist the a tag with the class 'btn-secondary' has 'Buy' text", () => {
    let filters = shallow(<Filters filters={filtros} />);
    const texts = filters.find('select').map(node => node.text());
    expect(texts).not.toBeNull();
});
