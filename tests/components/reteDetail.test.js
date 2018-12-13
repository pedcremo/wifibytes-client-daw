import RateDetail from '../../src/components/rateDetail';
import React from 'react';
import renderer from 'react-test-renderer';
import {Utils} from '../../src/utils';
import tarifaJSON from "../json_endpoints/tarifa.json";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
import { shallow, mount, render } from "enzyme";

jest.mock('../../src/utils');
const resp = tarifaJSON;

Utils.get.mockResolvedValueOnce(resp);
const rate = Enzyme.shallow(<RateDetail idRate="4" />);

it('Check if render in rateDetail it works properly', () => {
    const component = shallow(<RateDetail idRate="4"/>);
    expect(component).toHaveLength(1);
});



it('Check if render in rateDetail it works properly', () => {
    const component = shallow(<RateDetail idRate="4" />);
    expect(component).toMatchSnapshot();
});