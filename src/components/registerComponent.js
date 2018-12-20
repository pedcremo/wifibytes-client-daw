/** @module ComponentsApp */
import React from 'react';
import {Utils} from "../utils";
import {AuthService} from "../auth.service";
import ReCAPTCHA from "react-google-recaptcha";

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
            nombre : "",
            apellido : "",
            email : "",
            cifnif : "",
            password : "",
            errors: null
        }
    }
    componentDidMount(){
        
    }
    registerSubmit () {
        if(this.state.password != ""){
            let registerForm = {
                nombre : this.state.nombre,
                apellido : this.state.apellido,
                email : this.state.email,
                cifnif : this.state.cifnif,
                password : this.state.password 
            }
            AuthService.register(registerForm).then((res)=>{
                console.log(res)
            })
        }else{
            this.setState({
                errors: "No password"
            })
        }
    }
    updateInput(evt,target){
        this.setState({ [target] : evt.target.value });
    }
    render() {          
        return (
            <section id="register">
                <h1>{Utils.translate("register-title")}</h1>
                <form>
                    <h3>{this.state.errors}</h3>
                    <div className="register--containers">
                        <div className="register--content">
                            {/* NOM */}
                            <h4>{Utils.translate("register-name")}</h4>
                            <input value={this.state.nombre} onChange={(e)=>this.updateInput(e,'nombre')} placeholder={Utils.translate("register-name")}></input>
                        </div>
                        <div className="register--content">
                            {/* COGNOMS */}
                            <h4>{Utils.translate("register-surname")}</h4>
                            <input value={this.state.apellido} onChange={(e)=>this.updateInput(e,'apellido')} placeholder={Utils.translate("register-surname")}></input>
                        </div>
                        <div className="register--content">
                            {/* CORREU */}
                            <h4>{Utils.translate("register-email")}</h4>
                            <input value={this.state.email} onChange={(e)=>this.updateInput(e,'email')} placeholder={Utils.translate("register-email")}></input>
                        </div>
                        <div className="register--content">
                            {/* CIF/NIE */}
                            <h4>CIF/NIE</h4>
                            <input value={this.state.cifnif} onChange={(e)=>this.updateInput(e,'cifnif')} placeholder="CIF/NIE"></input>
                        </div>
                    </div>
                    <div className="register--containers">
                        <div className="register--content">
                            {/* PASSW */}
                            <h4>{Utils.translate("register-passs")}</h4>
                            <input type="password" value={this.state.password} onChange={(e)=>this.updateInput(e,'password')} placeholder={Utils.translate("register-passs")}></input>
                        </div>
                        <div className="register--content">
                            {/* PASSW */}
                            <h4>{Utils.translate("register-repeatPassw")}</h4>
                            <input type="password" placeholder={Utils.translate("register-repeatPassw")}></input>
                        </div>
                    </div>
                    <div className="register--checkbox">
                        <div>
                            {/* CHECK POLITICA PRIV */}
                            <input type="checkbox"></input>
                            <a href="/#legal"> {Utils.translate("register-legal")} </a>    
                        </div>
                        <div>
                            {/* CHECK NO REBRE OFERTES */}
                            <input type="checkbox"></input>
                            <a> {Utils.translate("register-newslater")}</a>
                        </div>
                    </div>
                    <div id="captcha">
                        <ReCAPTCHA
                        ref={this.recaptchaRef}
                        sitekey="6LesI4IUAAAAAHHx9B6OuMjqpVl9bIyLOT3n4y3C"
                        />
                    </div>

                    <button className="login-button btn" onClick={(e)=>this.registerSubmit(e)}>{Utils.translate("register-button")}</button>

                </form>
            </section>
        );
    }
}
export default Register;