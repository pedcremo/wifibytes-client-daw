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
    /**
     * @desc Adds the steps to follow
     * @param step contains the initial step
     * @param steps contains a library that has been filtered against a library in file agent.js
     */
    addSteps: (step, steps) =>
        dispatch({ type: ADD_STEPS, payload: { step, steps } }),
    /**
     * @desc Go to the next step
     */
    nextStep: () =>
        dispatch({ type: NEXT_STEP }),
    /**
     * @desc Go to the previous step
     */
    previousStep: () =>
        dispatch({ type: PREVIOUS_STEP }),
    /**
     * @desc Sets a specific step
     * @param step Contains a specific number
     */
    setStep: (step) =>
        dispatch({ type: UPDATE_STEP, payload: { step } }),
    /**
     * @desc Go to the next step
     */
    disableButton: () =>
        dispatch({ type: DISABLE_BUTTON }),
    /**
     * @desc Go to the previous step
     */
    activateButton: () =>
        dispatch({ type: ACTIVATE_BUTTON }),
    /**
     * @desc Sets a specific step
     */
});

/**
 * @desc Component Checkout validate the steps you have to follow
 */
class Checkout extends React.Component {
    constructor(props) {
        super(props)
        this.addSteps = (step, steps) => this.props.addSteps(step, steps);
        this.setStep = (step) => this.props.setStep(step);
    }

    componentDidMount() {
        /**
         * @desc Agent filters cart items and returns an array used to filter the steps to achieve the needed ones
         * @return @true object - Filtered library Steps.js
         * @return @false redirected to home
         */
        if (JSON.parse(localStorage.getItem('cartReducer')) != null) {
            let stepsRates = Agent.objectsToArray(JSON.parse(localStorage.getItem('cartReducer')).items, library);
            let filteredSteps = Agent.filterArray(steps, stepsRates);
            this.addSteps(1, filteredSteps);
        } else {
            this.context.router.history.push('/');
        }
    }

    /**
     * @desc componentDidUpdate is executed before the next component is mounted but after that component is initiated
     * with that in mind each step is provided with a new ID each time the method is invoked
     * then, once is assured no mistake a foreach query selected add event listener is provided 
     * containing a dispatched action from redux to allow a step to load if its pressed
     */

    componentDidUpdate() {
        const self = this;
        /**
         * @param item It is taken from the current dom element in the forEach function
         * @param index It is taken from the forEach function and specifies the current loop
         */
        const setID = (item, index) => {
            item.id = index + 1;
        };
        /**
         * @param item It is taken from the current dom element in the forEach function
         * @param index It is taken from the forEach function and specifies the current loop
         */
        const addClickEvent = (item, index) => item.addEventListener("click", function () {
            self.setStep(index + 1);
        });
        /**
         * @param item It is taken from the current dom element in the forEach function
         * @param index It is taken from the forEach function and specifies the current loop
         */
        document.querySelectorAll("div.step").forEach((item, index) => {
            setID(item, index);
            addClickEvent(item, index);
        });
        /**
         * @desc Each time the component is updated steps are checked
         * Then the button is activated or deactivated in case all steps are completed
         */
        steps.filter(step => step.completed===true).length !== steps.length?
        this.props.disableButton():
        this.props.activateButton();
    }

    sendOrder() {
        console.log("sendOrder",this.props.data);
        /**
         * @desc Agent retrieves data from props into an object for the /checkout endpoint
         * @param props Contains data from all the child components
         * @param steps Contains the library of needed steps
         */
        Agent.ObjectSendToOrder(this.props.data, steps);
    }
    /**
     * @desc Render prints the steps to follow and loads a step from a library where each
     * component step is declared and imported
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