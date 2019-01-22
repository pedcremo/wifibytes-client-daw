/** @module ComponentsApp */
import React from 'react';
import {AuthService} from "../../auth.service";
import Facturacion from "./datosFacturacion";
import Pdata from "./personalData"
import UserChoice from "./userChoice"
import LogIn from "../login/loginComponent";
import Register from "../login/registerComponent";
import SignIn from "../login/signIn";

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
        this.state = {
            personalDataViewIsValid: false,
            styleModal: false,
            selected: false
        }
        this.printComponent = this.printComponent.bind(this);
    }

    componentDidMount(){
        AuthService.isAuth().then((value)=>{
            console.log("EL usuario esta logeado")
        }).catch(()=>{
            this.changeModal(true)
        })
    }
    changeType(res){
        this.setState({
            selected : res
        })
    }
    changeModal(value){
        this.setState({
            styleModal : value
        })
    }
    printComponent(value){
        switch(value){
            case "login":
                this.changeType(value)
            break;
            case "register":
                this.changeType(value)
            break;
            case "none":
                this.changeModal(false)
            break;
            // default:
            //     return <UserChoice choice={this.printComponent} />
            // break;
        }
        this.render()
    }
    
    render() {
        return(
            <div>
                <div>
                    {this.state.selection === "pdata" ?
                        <Pdata/> :
                        <Facturacion/>
                    }
                </div>
                <div id="myModal" className="modal" style={{visibility: this.state.styleModal ? 'visible' : 'hidden' }}>
                    <div className="modal-content">
                    <span className="close" onClick={()=>this.changeModal(false)}>&times;</span>
                        {this.state.selected == "login" ? <SignIn type="login"/> :
                         this.state.selected == "register" ? <SignIn type="register"/> :
                         this.state.selected == "none" ? this.printComponent("none") :
                         <UserChoice choice={this.printComponent}/> }
                    </div>
                </div>
            </div>
        )
    }
}
export default Personal;
// {this.printComponent()}
//BOTO TANCAR MODAL
// <span className="close" onClick={()=>this.changeModal(false)}>&times;</span>