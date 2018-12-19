/** @module ComponentsApp */
import React from 'react';
import {Utils} from "../../utils";
import {AuthService} from "../../auth.service";
import Reaptcha from 'reaptcha';


/**
 * @class
 * Draw Login. A form to login
 */
class Register extends React.Component  {
    /**
     * @constructor
     */
    constructor() { 
        super();
        this.recaptchaRef = React.createRef();
        this.registerSubmit = this.registerSubmit.bind(this);
        this.state = {
            nombre : "", apellido : "", email : "",
            cifnif : "", password : "", captcha: false,
            legal: false, newslater: false, errorPassword: "", errorPassword2: "", 
            errorCaptcha: ""
        }
    }
    componentDidMount(){
        
    }
    registerSubmit () {
        if(this.state.password == this.state.password2 && this.state.captcha == true && this.state.legal == true){
            let diccionario = {
                nombre : this.state.nombre,
                apellido : this.state.apellido,
                email : this.state.email,
                cifnif : this.state.cifnif,
                password : this.state.password,
                // newslater : this.state.newslater
            } 
            console.log(diccionario);
            AuthService.register(diccionario).then((res)=>{
                console.log(res)
            })
        } else {
            if (this.state.password != this.state.password2) {
                this.setState({ errorPassword: Utils.translate("register-error-pass")});
                this.setState({ errorPassword2: Utils.translate("register-error-pass")});
            }
            if (this.state.captcha != true) this.setState({ errorCaptcha: Utils.translate("register-error-captcha")});
        }
    }
    updateInput(evt,target){
        this.setState({ [target] : evt.target.value });
    }
    lang() {
        let lang = Utils.getUserLang();
        if (lang=="va") lang="es"
        return lang
    }
    render() {
		return (
			<section id="register">
                <h1>{Utils.translate("register-title")}</h1>
                <form>
                    <div className="register--containers">
                        <div className="register--content">
                            {/* NOM */}
                            <h4>{Utils.translate("register-name")}</h4>
                            <input required value={this.state.nombre} onChange={(e)=>this.updateInput(e,'nombre')} placeholder={Utils.translate("register-name")}></input>
                        </div>
                        <div className="register--content">
                            {/* COGNOMS */}
                            <h4>{Utils.translate("register-surname")}</h4>
                            <input required value={this.state.apellido} onChange={(e)=>this.updateInput(e,'apellido')} placeholder={Utils.translate("register-surname")}></input>
                        </div>
                        <div className="register--content">
                            {/* CORREU */}
                            <h4>{Utils.translate("register-email")}</h4>
                            <input required value={this.state.email} onChange={(e)=>this.updateInput(e,'email')} placeholder={Utils.translate("register-email")}></input>
                        </div>
                        <div className="register--content">
                            {/* CIF/NIF */}
                            <h4>{Utils.translate("register-cifnif")}</h4>
                            <input required value={this.state.cifnif} onChange={(e)=>this.updateInput(e,'cifnif')} placeholder="CIF/NIE"></input>
                        </div>
                    </div>
                    <div className="register--containers">
                        <div className="register--content">
                            {/* PASSW */}
                            <h4>{Utils.translate("register-passs")}</h4>
                            <input required type="password" value={this.state.password} onChange={(e)=>this.updateInput(e,'password')} placeholder={Utils.translate("register-passs")}></input>
                            <br/><span className="errors">{this.state.errorPassword}</span>
                        </div>
                        <div className="register--content">
                            {/* PASSW */}
                            <h4>{Utils.translate("register-repeatPassw")}</h4>
                            <input required type="password" value={this.state.password2} onChange={(e)=>this.updateInput(e,'password2')} placeholder={Utils.translate("register-repeatPassw")}></input>
                            <br/><span className="errors">{this.state.errorPassword2}</span>
                        </div>
                    </div>
                    <div className="register--checkbox">
                        <div>
                            {/* CHECK POLITICA PRIV */}
                            <input required type="checkbox" value={this.state.legal} onClick={()=>{ if(this.state.legal) {this.setState({legal:false}) }else{ this.setState({legal:true}) } }}></input>
                            <a href="/#legal"> {Utils.translate("register-legal")} </a>    
                        </div>
                        <div>
                            {/* CHECK NO REBRE OFERTES */}
                            <input type="checkbox" value={this.state.newslater} onClick={()=>{ if(this.state.newslater) {this.setState({newslater:false}) }else{ this.setState({newslater:true}) } }}></input>
                            <a> {Utils.translate("register-newslater")}</a>
                        </div>
                    </div>
                    <button className="login-button btn" onClick={(e)=>this.registerSubmit(e)}>{Utils.translate("register-button")}</button>
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
                    hl={this.lang()}
                    />
                    <span className="errors">{this.state.errorCaptcha}</span>
                </div>
			</section>
		);
    }
}

export default Register;