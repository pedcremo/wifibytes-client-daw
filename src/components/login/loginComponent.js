/** @module ComponentsApp */
import React from 'react';
import {Utils} from "../../utils";
import {connect} from 'react-redux';
import Reaptcha from 'reaptcha';
import { Settings } from "../../settings";
import {login ,recoverPass , changeValue} from './loginActions'
import IsAuth from '../isAuth'
/**
 * @class
 * Draw Login. A form to login
 */


const mapDispatchToProps = dispatch =>({
    login : (data) => 
        dispatch(login(data)),
    recoverPass : (email) => 
        dispatch(recoverPass(email)),
    changeValue : (value , target) =>
        dispatch(changeValue(value , target)),
})
const mapStateToProps = state => ({
    ...state.loginReducer,
});

class Login extends React.Component  {

    recoverPass(){
        if (this.props.captcha){ // Check if captcha is checked
            if(this.props.email.match(/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/)){// Check if email is correct
                this.props.recoverPass(this.props.email)
            }
        }else
            this.props.changeValue(Utils.translate("register-error-captcha"),'errorCaptcha')
    }
    /** render  */
    render() {
        const { loading , showRecoverPass , error , changeView, loadingRecover, errorRecover , changeValue , username , password , email , login , errorCaptcha , captcha} = this.props
        return (
                <div className="loginForm">
                    <IsAuth redirect={true}/>
                    <h1>{Utils.translate("login-title")}</h1>
                    <div className="login-acces">
                        <form>
                            <span>
                                <h4>Username or Password</h4>
                                <input type="text" required value={username} onChange={(ev)=>changeValue(ev.target.value,'username')} placeholder={Utils.translate("login-acces-dni-form")}></input>
                            </span>
                            <span>
                                <h4>{Utils.translate("login-acces-password")}</h4>
                                <input type="password" required value={password} onChange={(ev)=>changeValue(ev.target.value,'password')} placeholder={Utils.translate("login-acces-password-form")}></input>
                            </span>
                            <span>
                                <button className="login-button btn" id="loginButton" onClick={()=>login({username_or_email:username,password:password})}>{Utils.translate("login-button-acces")}</button>
                                <a onClick={()=>changeView("register")} className="login-button btn left" href={"#/register"}>{Utils.translate("login-button-register")}</a>
                                {loading ? <img src="https://www.voya.ie/Interface/Icons/LoadingBasketContents.gif" width="50" height="40"></img> : ''}
                                {error ? <p>{error + " Not correct password or username"}</p> : ''}
                            </span>
                        </form>
                        <p className="login-recuperar" onClick={()=>changeValue(!showRecoverPass,'showRecoverPass')}>{Utils.translate("login-text-recover")}</p>
                        <div id="login-recover" className={showRecoverPass ? 'login-recuperar-input' : 'login-recov-pass'}>
                            <form>
                                <span>
                                    <input value={email} required onChange={(ev)=>changeValue(ev.target.value,'email')} pattern="^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$" placeholder={Utils.translate("login-recover-password")}></input>
                                    <button onClick={() => this.recoverPass( captcha , email )} className="login-button btn">{Utils.translate("login-button-recover")}</button>
                                </span>
                            </form>
                            <div id="captcha">
                                <Reaptcha sitekey={ Settings.captchaSiteKey } onVerify={ () => changeValue(true,'captcha') } onExpire={ ()=> changeValue(false,'captcha') } hl={Utils.getUserLang() == "va" ? "es" : Utils.getUserLang()}/>
                                <span className="errors">{errorCaptcha}</span>
                                {loadingRecover ? <img src="https://www.voya.ie/Interface/Icons/LoadingBasketContents.gif" width="50" height="40"></img> : ''}
                                {errorRecover ? <p>{errorRecover}</p> : ''}
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);