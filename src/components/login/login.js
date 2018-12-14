/** @module ComponentsApp */
import React from 'react';
import {Utils} from "../../utils";

/**
 * @class
 * Draw Login. A form to login
 */
class Login extends React.Component  {
    /**
     * @constructor
     */
    constructor() { 
        super();
	}
	
	componentDidMount(){
        
    }
    recoverPass(){
        let recover = document.getElementById("login-recover");
        /**
         * 
         * It check if hidden class is in recovery div and if it is in it, it will remove it 
         * and add class with animation and see visible it and vice versa
         * 
         * */
            if (recover.classList.contains("login-recuperar-input")){
                recover.classList.toggle("login-recuperar-input")
                recover.classList.add("login-recov-pass");
            }else if (!recover.classList.contains("login-recuperar-input")){
                recover.classList.toggle("login-recov-pass")
                recover.classList.add("login-recuperar-input");
            }
          
    }
 
    /** render  */
    render() {  
		return (
            <div className="login">
                <div className="loginForm">
                    <h1>{Utils.translate("login-title")}</h1>
                    <div className="login-acces">
                        <h4>{Utils.translate("login-acces-dni")}</h4>
                        <input className="loginInput" placeholder={Utils.translate("login-acces-dni-form")}></input>
                        <h4>{Utils.translate("login-acces-password")}</h4>
                        <input className="loginInput" placeholder={Utils.translate("login-acces-password-form")}></input>
                        <button className="login-button btn">{Utils.translate("login-button-acces")}</button>
                        <a className="login-button btn left" href={"#/register"}>{Utils.translate("login-button-register")}</a>
                        <p className="login-recuperar" onClick={this.recoverPass}>{Utils.translate("login-text-recover")}</p>
                        <div id="login-recover" className="login-recov-pass">
                            <input className="loginInput" placeholder={Utils.translate("login-recover-password")}></input>
                            <button className="login-button btn">{Utils.translate("login-button-recover")}</button>
                        </div>
                    </div>
                </div>
            </div>
		);
    }
}
export default Login;