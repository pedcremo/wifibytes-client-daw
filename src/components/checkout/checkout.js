import React from 'react'
import { connect } from "react-redux"
import { Step } from 'semantic-ui-react'
import { addSteps, updateStep } from "../../actions/checkoutActions";
import {Agent} from './agent';

/**
 * mock steps
 */
const steps = [
    {
        key: 'personal_data',
        active: true,
        completed: true,
        title: 'Dades Personals',
    },
    {
        key: 'contract',
        active: false,
        completed: false,
        title: 'Contracte',
    },
    { 
        key: 'confirm',
        active: false,
        completed: false,
        title: 'Confirmar Pedido' 
    },
]
/**
 * Component Checkout validate the steps you have to follow
 */
class Checkout extends React.Component {
    constructor(props) {
        super(props)
        this.nextStep = this.nextStep.bind(this)
        this.previousStep = this.previousStep.bind(this)
    }

    /* setStep(step) {
        this.props.dispatch(updateStep(step));
    } */

    /**
     * go to the next step
     */
    nextStep() {
        this.props.dispatch(updateStep(this.props.currentStep+1));
    }

    /**
     * go to the previous step
     */
    previousStep() {
        this.props.dispatch(updateStep(this.props.currentStep-1));
    }

    /**
     * shows the step in which you are
     */
    showStep() {
        switch (this.props.currentStep) {
            case 1:
                console.log("firstStep");
                return <button onClick={this.nextStep}>Next</button>
                
            case 2:
                console.log("secondStep");
                return <button onClick={this.nextStep}>Next</button>

            case 3:
                console.log("thirdStep");
                return <h1>3rd Step</h1>

            default:
                return
        }
    }

    /**
     * we call getsteps to validate the items and depending on the items shows the steps to follow
     * 
     */
    componentDidMount(){
        let g = Agent.getSteps(["0cab50a1-ea99-4aa4-9a49-1983f06a5614",5,"0cab70a1-ea99-4aa4-9a49-1983f06a5614"]);
       // let g = Agent.getSteps(["0cab50a1-ea99-4aa4-9a49-1983f06a5614", 5,"0cab70a1-ea99-4aa4-9a49-1983f06a5614"]);
        console.log("G",g);
        this.props.dispatch(addSteps(1, steps));
    }

    /**
     * render paint the step where are you
     */
    render() {
        const { loading, steps, currentStep } = this.props;
        if (loading) 
            return (<div>Loading...</div>);
        if (steps.length>0 && currentStep){
            return (
                <div>
                    <Step.Group items={steps} attached='top' ordered />

                    {this.showStep()}
                </div>
            )
        } else {
            return(
                <span>LOADING!</span>
            );
        }
    }
}

const mapStateToProps = state => ({
    currentStep: state.currentCheckout.currentStep,
    steps: state.currentCheckout.steps,
    loading: state.currentCheckout.loading
});

export default connect(mapStateToProps)(Checkout);