/** @module ComponentsApp */
import {Router} from "../../router.js"; //Knows what to do for every single URL
import React from 'react';
import {Utils} from "../../utils";
import {AuthService} from "../../auth.service";
import Reaptcha from 'reaptcha';


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
        this.recoverPass = this.recoverPass.bind(this);
        this.state = {
            username:"",
            password:"",
            email:"",
            errorCaptcha: "",
            captcha: false,
            error:null
        }
	}
	
	componentDidMount(){
        AuthService.isAuth().then((res)=>{
            console.log("Already loged")
            console.log(res)
            Router.navigate("home");
        }).catch((err)=>{
            console.log(err)
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
    /**
     * Recover password, it does a connection with backend and ofert they your 
     * email in diccionario(on the data is sended) and the backend do everything else.
     */
    recoverPass(){
        if (this.state.captcha === true){
            if(this.state.email.match(/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/)){
                let diccionario = {
                    email: this.state.email
                }
                AuthService.recoverPass(diccionario).then((res)=>{
                    alert(JSON.parse(res).message+", compruebe su correo, tenga en cuenta que esto puede tardar unos minutos.")
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
        }else{
            this.setState({ errorCaptcha: Utils.translate("register-error-captcha")});
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
            console.log(err)
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
                        <form>
                            <h4>{Utils.translate("login-acces-dni")}</h4>
                            <input type="text" required size="10" maxLength="9" className="loginInput" pattern="^[0-9]{8}[a-zA-Z]{1}$" value={this.state.username} onChange={(e)=>this.updateInput(e,'username')} placeholder={Utils.translate("login-acces-dni-form")}></input>
                            <h4>{Utils.translate("login-acces-password")}</h4>
                            <input type="password" required className="loginInput" value={this.state.password} onChange={(e)=>this.updateInput(e,'password')} placeholder={Utils.translate("login-acces-password-form")}></input>
                            <button className="login-button btn" onClick={this.loginSubmit}>{Utils.translate("login-button-acces")}</button>
                            <a className="login-button btn left" href={"#/register"}>{Utils.translate("login-button-register")}</a>
                        </form>
                        <p className="login-recuperar" onClick={this.showrecoverPass}>{Utils.translate("login-text-recover")}</p>
                        <div id="login-recover" className="login-recov-pass">
                            <form>
                                <input className="loginInput" required onChange={(e)=>this.updateInput(e,'email')} pattern="^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$" placeholder={Utils.translate("login-recover-password")}></input>
                                <button value={this.state.email} onClick={this.recoverPass} className="login-button btn">{Utils.translate("login-button-recover")}</button>
                            </form>
                            <div id="captcha">
                                <Reaptcha
                                ref={this.recaptchaRef}
                                sitekey="6LesI4IUAAAAAHHx9B6OuMjqpVl9bIyLOT3n4y3C"
                                onVerify={() => {
                                    this.state.captcha = true;
                                }}
                                onExpire={() => {
                                    this.state.captcha = false;
                                }}
                                hl={Utils.getUserLang()}
                                />
                                <span className="errors">{this.state.errorCaptcha}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		);
    }
}
export default Login;