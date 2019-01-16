import React from 'react'
import { connect } from "react-redux";
import { Step ,Icon} from 'semantic-ui-react'
import { Agent } from './agent'

class Checkout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            step: 1
        }
        this.nextStep = this.nextStep.bind(this)
        this.previousStep = this.previousStep.bind(this)
        this.showStep = this.showStep.bind(this)
    }

    setStep(step) {
        this.setState({ step: step})
    }

    nextStep() {
        this.setState({ step: this.state.step + 1 })
    }

    previousStep() {
        this.setState({ step: this.state.step - 1 })
    }

    handleRemoveItem(e, item) {
        e.stopPropagation()
        this.props.removeFromCart(item.id)
    }

    showStep() {
        switch (this.state.step) {
            case 1:
                console.log("firstStep");
                let g = Agent.getSteps(["0cab50a1-ea99-4aa4-9a49-1983f06a5614", 5,"0cab70a1-ea99-4aa4-9a49-1983f06a5614"]);
                console.log("G",g);
                return <button onClick={this.nextStep}>Next</button>
                
            case 2:
                console.log("secondStep");
                return <button onClick={this.nextStep}>Next</button>

            case 3:
                console.log("thirdStep");
                return <button onClick={this.nextStep}>Next</button>

            case 4:
                console.log("4thStep");
                return <h1>4th Step</h1>

            default:
                return
        }
    }

    render() {
        return (
            <div>
                <Step.Group attached='top'>
                    <Step active={this.state.step === 1} onClick={() => this.setStep(1)}>
                        <Step.Content>
                            <Step.Title>Datos Personales</Step.Title>
                        </Step.Content>
                        <Icon name='check' />
                    </Step>

                    <Step active={this.state.step === 2} onClick={() => this.setStep(2)}>
                        <Step.Content>
                            <Step.Title>2nd Step</Step.Title>
                        </Step.Content>
                    </Step>

                    <Step active={this.state.step === 3} onClick={() => this.setStep(3)}>
                        <Step.Content>
                            <Step.Title>3rd Step</Step.Title>
                        </Step.Content>
                    </Step>

                    <Step active={this.state.step === 4} onClick={() => this.setStep(4)}>
                        <Step.Content>
                            <Step.Title>4th Step</Step.Title>
                        </Step.Content>
                    </Step>
                </Step.Group>

                {this.showStep()}
            </div>
        )
    }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(Checkout);