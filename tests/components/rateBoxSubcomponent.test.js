import React from 'react';
import RateBoxSubComponent from '../../src/components/rateBoxSubcomponent';
import Adapter from "enzyme-adapter-react-16";
import tarifaJSON from '../json_endpoints/tarifa.json';
import { shallow, mount, configure } from "enzyme";

configure({ adapter: new Adapter() });


describe('<RateBoxSubComponent/>', () => {

    it('RateBoxSubComponent component renders the RateBoxSubComponent correctly', () => {
        const rendered = mount(<RateBoxSubComponent rates={tarifaJSON} />)
        expect(rendered).toMatchSnapshot()
    });

    it('Check if there is just one component (RateBoxSubComponent) when rendering is done', () => {
        const component = shallow(<RateBoxSubComponent rates={tarifaJSON} />);
        expect(component).toHaveLength(1);
    });

    it("Check if there are 1 or more divs with a class border-dark (rates boxes)", () => {
        const rateBox = shallow(<RateBoxSubComponent rates={tarifaJSON} />);
        expect(rateBox.find("div.border-dark").length).toBeGreaterThan(0);
    });

    it("Component must fail due to JSON input doesnt contains expected information", () => {
        const rateBox = shallow(<RateBoxSubComponent rates={[]} />);
        expect(function () {
            rateBox
        }).toThrowError(undefined);
    });

    /* it('RateBoxSubComponent component renders the RateBoxSubComponent correctly', () => {
    const rendered = renderer.create(<RateBoxSubComponent rates={tarifaJSON.results} />);
        expect(rendered.toJSON()).toMatchSnapshot();
    });

    it('Check if there is just one component when rendering is done', () => {
        const component = shallow(<RateBoxSubComponent rates={tarifaJSON.results} />);
        expect(component).toHaveLength(1);
    });

    it("Check if there are 1 or more divs with a class border-dark ", () => {
      let rateBox = shallow(<RateBoxSubComponent rates={tarifaJSON.results} />);
      expect(rateBox.find("div.border-dark").length).toBeGreaterThan(0);
    }); */
});