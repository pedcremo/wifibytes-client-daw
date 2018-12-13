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
                    </div>
                </div>
            </div>
		);
    }
}
export default Login;