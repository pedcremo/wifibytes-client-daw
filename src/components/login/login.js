/** @module ComponentsApp */
import {Router} from "../../router.js"; //Knows what to do for every single URL
import React from 'react';
import {Utils} from "../../utils";
import {AuthService} from "../../auth.service";


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
        this.loginSubmit = this.loginSubmit.bind(this);
        this.state = {
            username:"",
            password:"",
            error:null
        }
	}
	
	componentDidMount(){
        AuthService.isAuth().then((res)=>{
            console.log("Already loged")
            console.log(res)
            Router.navigate("home");
        }).catch((err)=>{
            
        })
    }
    showrecoverPass(){
        let recover = document.getElementById("login-recover");
        /**
         * It check if hidden class is in recovery div and if it is in it, it will remove it 
         * and add class with animation and see visible it and vice versa
         * */
            if (recover.classList.contains("login-recuperar-input")){
                recover.classList.toggle("login-recuperar-input")
                recover.classList.add("login-recov-pass");
            }else if (!recover.classList.contains("login-recuperar-input")){
                recover.classList.toggle("login-recov-pass")
                recover.classList.add("login-recuperar-input");
            }
    }
    loginSubmit(){
        let loginSubmit = {
            username:this.state.username,
            password:this.state.password
        }
        AuthService.login(loginSubmit).then((res)=>{
            console.log(res)
            Router.navigate("home");
        }).catch((err)=>{
            this.setState({
                error: "ERROR"
            })
        })
    }
    updateInput(evt,target){
        this.setState({ [target] : evt.target.value });
    }
    /** render  */
    render() {  
		return (
            <div>
                <div className="loginForm">
                    <h1>{Utils.translate("login-title")}</h1>
                    <div className="login-acces">
                        <h3>{this.state.error}</h3>
                        <h4>{Utils.translate("login-acces-dni")}</h4>
                        <input type="text" size="10" maxLength="9" value={this.state.username} onChange={(e)=>this.updateInput(e,'username')} placeholder={Utils.translate("login-acces-dni-form")}></input>
                        <h4>{Utils.translate("login-acces-password")}</h4>
                        <input type="password" value={this.state.password} onChange={(e)=>this.updateInput(e,'password')} placeholder={Utils.translate("login-acces-password-form")}></input>
                        <button className="login-button btn" onClick={this.loginSubmit}>{Utils.translate("login-button-acces")}</button>
                        <a className="login-button btn left" href={"#/register"}>{Utils.translate("login-button-register")}</a>
                        <p className="login-recuperar" onClick={this.showrecoverPass}>{Utils.translate("login-text-recover")}</p>
                        <div id="login-recover" className="login-recov-pass">
                            <input placeholder={Utils.translate("login-recover-password")}></input>
                            <button className="login-button btn">{Utils.translate("login-button-recover")}</button>
                        </div>
                    </div>
                </div>
            </div>
		);
    }
}
export default Login;