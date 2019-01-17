import Checkout, {previousStep, nextStep} from '../../src/components/checkout/checkout';
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

let checkout

beforeEach(() => {
    checkout = Enzyme.shallow(<Checkout />);

    checkout.setState({
        step: 1
    });
});

describe('state', () => {

    function nextStep() {
        checkout.setState({ step: checkout.state('step') + 1 })
    }

    function previousStep() {
        checkout.setState({ step: checkout.state('step') - 1 })
    }


    it("Checkout render must be called and it works properly", () => {
        expect(checkout).toHaveLength(1);
    });

    it("Step must be equal 1", () => {
        expect(checkout.state('step')).toBe(1);
    });

    it('Step can be increased and decreased', () => {
        nextStep();
        expect(checkout.state('step')).toBe(2);
        previousStep();
        expect(checkout.state('step')).toBe(1);
    })

    // it('When button is clicked the step is changed', () => {
    //     const checkout = Enzyme.shallow(<Checkout />);
    //     checkout.debug();
    //     checkout.find('#step').simulate('click');
    //     expect(checkout.state('step')).toBe(2);
    // })

})