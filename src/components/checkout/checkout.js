import React from 'react'
import { connect } from "react-redux"
import { Step } from 'semantic-ui-react'
import { addSteps, updateStep } from "../../actions/checkoutActions";

const steps = [
    {
        key: 'personal_data',
        active: true,
        completed: false,
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
        title: 'Confirmar Pedido' },
]

class Checkout extends React.Component {
    constructor(props) {
        super(props)
        this.nextStep = this.nextStep.bind(this)
        this.previousStep = this.previousStep.bind(this)
    }

    setStep(step) {
        this.props.dispatch(updateStep(step));
    }

    nextStep() {
        this.props.dispatch(updateStep(this.props.currentStep+1));
    }

    previousStep() {
        this.props.dispatch(updateStep(this.props.currentStep-1));
    }

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

    componentDidMount(){
        this.props.dispatch(addSteps(1, steps));
    }

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