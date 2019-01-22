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
            console.log("EL usuario esta logeado", value)
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
<<<<<<< HEAD
        /* console.log(this.state.styleModal) */
        return(
            <div>
                <div>
                    <button  onClick={()=>this.changeType("login")}>Login</button>
                    <button>Continuar igualmente</button>
                    <button  onClick={()=>this.changeType("register")}>Register</button>
                </div>
                <div>
                    
                    {this.state.type === "register" ? <Facturacion/>: <Pdata />}
                    
                </div>

{/* En el modal el style da error, a ver como hacemos para que funcione */}

                    <div id="myModal" className="modal" styles={this.state.styleModal} >
                        <div className="modal-content">
                            <span className="close" onClick={()=>this.changeModal("none")}>&times;</span>
                            <p>Some text in the Modal..</p>
                        </div>
=======
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
>>>>>>> 96f8001e9c9751ea469effea742429fa346de88f
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