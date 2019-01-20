/** @module ComponentsApp */
import React from 'react';
import {AuthService} from "../../auth.service";
import PersonalDataForm from "./personalDataForm";
import UserChoice from "./userChoice"
import { withRouter } from 'react-router-dom';


/**
 * @class
 * Draw Login. A form to login
 */
class Personal extends React.Component  {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);
        this.contiWithoutLogin = this.contiWithoutLogin.bind(this);
        this.redirect = this.redirect.bind(this);
        this.state = {
            optionsToShow: {
                display: "none"
            },
            showForm: {
                display: "none"
            },
            personalDataViewIsValid: false,
            styleModal: "display: none"
        }
    }

    componentWillReceiveProps(){
        /* this.setState({
            recive datos del usuario
        }) */
    }
    componentDidMount(){
        AuthService.isAuth().then( value =>{
            console.log("EL usuario esta logeado", value)
        }).catch(()=>{
            console.log("No esta logueado")
            this.setState({optionsToShow: {display: "block"}})
            /* this.setState({showForm: {display: "block"}}) */

            /* this.changeState("optionsToShow", {display: "block"}) */
        })
    }

    contiWithoutLogin() {
         this.setState({
            optionsToShow: {
                display: "none"
            },
            showForm: {
                display: "block"
            }
        })
    }
    

    redirect(goTo) { 
        this.props.history.push(goTo);
    }
    

    render() {
        return(
            <div>
                <div style={this.state.optionsToShow}>
                    <button  onClick={()=>this.redirect("login")}>Login / Register</button>
                    <button onClick={()=>this.contiWithoutLogin()}> Continuar igualmente </button>
                </div>

                <div style={this.state.showForm}>
                    <PersonalDataForm />
                </div>

            </div>
        )
    }
}
export default withRouter(Personal);