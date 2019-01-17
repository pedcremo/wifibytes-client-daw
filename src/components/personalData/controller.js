/** @module ComponentsApp */
import React from 'react';
import {AuthService} from "../../auth.service";
import Facturacion from "./datosFacturacion";
import Pdata from "./personalData"
import UserChoice from "./userChoice"

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
            type : this.props.type ? this.props.type : window.location.href.split('/')[4] ? window.location.href.split('/')[4] : "initial",
            personalDataViewIsValid: false,
            styleModal: "display: none"
        }
    }

    componentWillReceiveProps(){
        this.setState({
            type : window.location.href.split('/')[4]
        })
    }
    componentDidMount(){

        AuthService.isAuth().then((value)=>{
            console.log("EL usuario esta logeado")
        }).catch(()=>{
            console.log("No esta logueado")
            this.changeModal("block")
            
            //<UserChoice />
        })
    }

    changeType(res){
        this.setState({
            type : res
        })
    }

    changeModal(value){
        console.log(value)
        this.setState({
            styleModal : "display: "+value
        })
    }
    

    render() {
        console.log(this.state.styleModal)
        return(
            <div>
                <div>
                    <button  onClick={()=>this.changeType("login")}>Login</button>
                    <button>Continuar igualmente</button>
                    <button  onClick={()=>this.changeType("register")}>Register</button>
                </div>
                <div>
                    {this.state.type === "register"?
                        <Facturacion/>:
                        <Pdata />
                    }
                </div>
/**
En el modal el style da error, a ver como hacemos para que funcione
 */
                    <div id="myModal" className="modal" style={this.state.styleModal} >
                        <div className="modal-content">
                            <span className="close" onClick={()=>this.changeModal("none")}>&times;</span>
                            <p>Some text in the Modal..</p>
                        </div>
                    </div>
            </div>
        )
    }
}
export default Personal;