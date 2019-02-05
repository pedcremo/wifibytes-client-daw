import Articles from '../../src/components/catalog/articles';
import articulo from '../json_endpoints/articulo.json';
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

it('Articles component renders the Articles correctly', () => {
    const rendered = renderer.create(<Articles articles={articulo.results} />);
    expect(rendered.toJSON()).toMatchSnapshot();
});

it("Articles render must be called and it works properly", () => {
    const articles = Enzyme.shallow(<Articles articles={articulo.results} />);
    expect(articles).toHaveLength(1);
});

it("Check if there are exactly 10 articles", () => {
    let articles = shallow(<Articles articles={articulo.results} />);
    expect(articles.find(".card").length).toBe(10);
});

it("Check if there exist the a tag with the class 'btn-secondary' has 'Buy' text", () => {
    let articles = shallow(<Articles articles={articulo.results} />);
    const texts = articles.find('.btn-secondary').map(node => node.text());
    expect(texts).toEqual(['Buy', 'Buy', 'Buy', 'Buy', 'Buy', 'Buy', 'Buy', 'Buy', 'Buy', 'Buy']);
});
  