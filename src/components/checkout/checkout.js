import React from 'react'
import { connect } from "react-redux"
import { Step } from 'semantic-ui-react'
import { Agent } from './agent';
import PropTypes from 'prop-types'

import steps from "./libraries/steps";
import library from "./libraries/rule_based_library.json";

import {
    ADD_STEPS,
    NEXT_STEP,
    PREVIOUS_STEP,
    UPDATE_STEP,
    DISABLE_BUTTON,
    ACTIVATE_BUTTON
} from '../../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
    addSteps: (step, steps) =>
        dispatch({ type: ADD_STEPS, payload: { step, steps } }),
    /**
     * Go to the next step
     */
    nextStep: () =>
        dispatch({ type: NEXT_STEP }),
    /**
     * Go to the previous step
     */
    previousStep: () =>
        dispatch({ type: PREVIOUS_STEP }),
    /**
     * Sets a specific step
     */
    setStep: (step) =>
        dispatch({ type: UPDATE_STEP, payload: { step } }),
    /**
     * Go to the next step
     */
    disableButton: () =>
        dispatch({ type: DISABLE_BUTTON }),
    /**
     * Go to the previous step
     */
    activateButton: () =>
        dispatch({ type: ACTIVATE_BUTTON }),
    /**
     * Sets a specific step
     */
});

/**
 * Component Checkout validate the steps you have to follow
 */
class Checkout extends React.Component {
    constructor(props) {
        super(props)
        this.addSteps = (step, steps) => this.props.addSteps(step, steps);
        this.setStep = (step) => this.props.setStep(step);
    }

    /**
     * Agent filters cart items and returns an array used to filter the steps to achieve the needed ones
     */
    componentDidMount() {
        console.log(JSON.parse(localStorage.getItem('cartReducer')));
        if (JSON.parse(localStorage.getItem('cartReducer')) != null) {
            let stepsRates = Agent.objectsToArray(JSON.parse(localStorage.getItem('cartReducer')).items, library);
            let filteredSteps = Agent.filterArray(steps, stepsRates);
            this.addSteps(1, filteredSteps);
        } else {
            this.context.router.history.push('/');
        }
    }

    componentDidUpdate() {
        const self = this;
        const setID = (item, index) => {
            item.id = index + 1;
        };
        const addClickEvent = (item, index) => item.addEventListener("click", function () {
            self.setStep(index + 1);
        });

        document.querySelectorAll("div.step").forEach((item, index) => {
            setID(item, index);
            addClickEvent(item, index);
        });
        
        steps.filter(step => step.completed===true).length !== steps.length?
        this.props.disableButton():
        this.props.activateButton();
    }

    sendOrder() {
        console.log("sendOrder",this.props);
        //let data = { "personal_data": { "name": "pepito", "surname": "caball" }, "contract": { "sd": "sdsd" }, "confirm": { "asd": "sdsd" } };
        Agent.ObjectSendToOrder(this.props.data, steps);
    }
    /**
     * Render prints the steps to follow and calls the function show step
     */
    render() {
        const { loading, steps, currentStep, nextStep, disabled } = this.props;
        if (loading)
            return (<div>Loading...</div>);
        if (steps.length > 0 && currentStep) {
            return (
                <div>
                    <Step.Group items={steps} attached='top' ordered />
                    
                    {steps[currentStep-1].component}
                    <div className="container">
                        <div className="row justify-content-md-center p-5">
                            {steps.length > currentStep?
                                (<button 
                                    onClick={nextStep} 
                                    className="ui right big black labeled icon button">
                                    <i className="right arrow icon"></i>
                                    {this.context.t('checkout-next')}
                                </button>):(
                                    (disabled)?
                                    (
                                        <button 
                                                disabled  
                                                className="massive ui labeled icon black button">
                                                <i className="icon truck"></i> 
                                                {this.context.t('checkout-submit')}
                                        </button>
                                        ) : (
                                        <button 
                                            onClick={() => this.sendOrder()}
                                            className="massive ui labeled icon black button">
                                            <i className="icon truck"></i> 
                                            {this.context.t('checkout-submit')}
                                        </button>
                                    )
                                )
                            }
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <span>LOADING!</span>
            );
        }
    }
}

const mapStateToProps = state => ({
    currentStep: state.currentCheckout.currentStep,
    steps: state.currentCheckout.steps,
    data: state.currentCheckout.data,
    loading: state.currentCheckout.loading,
    disabled: state.currentCheckout.disabled
});

Checkout.contextTypes = {
    t: PropTypes.func.isRequired,
    router: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);