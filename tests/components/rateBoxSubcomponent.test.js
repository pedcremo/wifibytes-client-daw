import tarifaJSON from '../json_endpoints/tarifa.json';
import React from 'react';
import renderer from 'react-test-renderer';
import RateBoxSubComponent from '../../src/components/rateBoxSubcomponent';
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
import { shallow, mount, render } from "enzyme";

const $ = require('jquery');

describe('<RateBoxSubComponent/>', () => {

    it('RateBoxSubComponent component renders the RateBoxSubComponent correctly', () => {
        
        const rendered = renderer.create(<RateBoxSubComponent rates={tarifaJSON} />);
        expect(rendered.toJSON()).toMatchSnapshot();
    });

    it('Check if there is just one component when rendering is done', () => {
        const component = shallow(<RateBoxSubComponent rates={tarifaJSON} />);
        expect(component).toHaveLength(1);
    });

    it("Check if there are 1 or more divs with a class border-dark ", () => {
      let rateBox = shallow(<RateBoxSubComponent rates={tarifaJSON} />);
      expect(rateBox.find("div.border-dark").length).toBeGreaterThan(0);
    });
});

