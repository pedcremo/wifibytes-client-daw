/** @module ComponentsApp */
import React from 'react';
import {Utils} from "../../utils";
import {connect} from 'react-redux';
import Reaptcha from 'reaptcha';
import { Settings } from "../../settings";
import {login,showRecover,recoverPass} from './loginActions'

/**
 * @class
 * Draw Login. A form to login
 */
class Login extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            password:"",
            email:"",
            errorCaptcha: "",
            captcha: false,
        }
        this.recoverPass = this.recoverPass.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this);
    }
    loginSubmit(){
        this.props.login({
            username:this.state.username,
            password:this.state.password
        })
    }
    /**Recover password, it does a connection with backend and ofert they your
     * email in diccionario(on the data is sended) and the backend do everything else.*/
    recoverPass(){
    /*** Recover password, it does a connection with backend and ofert they your
     * email in diccionario(on the data is sended) and the backend do everything else.*/
        if (!this.state.captcha === true){ // Check if captcha is checked
            if(this.state.email.match(/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/)){// Check if email is correct
                this.props.recoverPass({
                    email: this.state.email
                })
            }
        }else
            this.setState({ errorCaptcha: Utils.translate("register-error-captcha")});
    }
    updateInput(evt,target){
        this.setState({ [target] : evt.target.value });
    }
    /** render  */
    render() {
        const { loading , showRecoverPass , error , changeView, loadingRecover, errorRecover} = this.props
		return (
                <div className="loginForm">
                    <h1>{Utils.translate("login-title")}</h1>
                    <div className="login-acces">
                        <form>
                            <span>
                                <h4>{Utils.translate("login-acces-dni")}</h4>
                                <input type="text" required size="10" maxLength="9" className="loginInput" pattern="^[0-9]{8}[a-zA-Z]{1}$" value={this.state.username} onChange={(e)=>this.updateInput(e,'username')} placeholder={Utils.translate("login-acces-dni-form")}></input>
                            </span>
                            <span>
                                <h4>{Utils.translate("login-acces-password")}</h4>
                                <input type="password" required className="loginInput" value={this.state.password} onChange={(e)=>this.updateInput(e,'password')} placeholder={Utils.translate("login-acces-password-form")}></input>
                            </span>
                            <span>
                                <button className="login-button btn" id="loginButton" onClick={this.loginSubmit}>{Utils.translate("login-button-acces")}</button>
                                <a onClick={()=>changeView("register")} className="login-button btn left" href={"#/register"}>{Utils.translate("login-button-register")}</a>
                                {loading ? <img src="https://www.voya.ie/Interface/Icons/LoadingBasketContents.gif" width="50" height="40"></img> : ''}
                                {error ? <p>{error + " Not correct password or username"}</p> : ''}
                            </span>
                        </form>
                        <p className="login-recuperar" onClick={this.props.showRecover}>{Utils.translate("login-text-recover")}</p>
                        <div id="login-recover" className={showRecoverPass ? 'login-recuperar-input' : 'login-recov-pass'}>
                            <form>
                                <span>
                                    <input className="loginInput" required onChange={(e)=>this.updateInput(e,'email')} pattern="^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$" placeholder={Utils.translate("login-recover-password")}></input>
                                    <button value={this.state.email} onClick={this.recoverPass} className="login-button btn">{Utils.translate("login-button-recover")}</button>
                                </span>
                            </form>
                            <div id="captcha">
                                <Reaptcha sitekey={Settings.captchaSiteKey} onVerify={() => {this.state.captcha = true}} onExpire={() => {this.state.captcha = false}} hl={Utils.getUserLang() == "va" ? "es" : Utils.getUserLang()}/>
                                <span className="errors">{this.state.errorCaptcha}</span>
                                {loadingRecover ? <img src="https://www.voya.ie/Interface/Icons/LoadingBasketContents.gif" width="50" height="40"></img> : ''}
                                {errorRecover ? <p>{errorRecover}</p> : ''}
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

const mapDispatchToProps = dispatch =>({
    login : (data) => dispatch(login(data)),
    recoverPass : (data) => dispatch(recoverPass(data)),
    showRecover : () => dispatch(showRecover()),
})
const mapStateToProps = state => ({
    ...state.loginReducer
});

export default connect(mapStateToProps,mapDispatchToProps)(Login);