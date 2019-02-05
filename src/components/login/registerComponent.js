/** @module ComponentsApp */
import React from 'react';
import {Utils} from "../../utils";
import {connect} from 'react-redux';
import {Settings} from "../../settings";
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
            legal: false, newsletter: false, errorPassword: "", errorPassword2: "",
            errorCaptcha: "", errorEmail: "", error: ""
        }
    }
    componentDidMount(){

    }

    registerSubmit () {
        if(!this.validateData()){
            let diccionario = {
                nombre : this.state.nombre,
                apellido : this.state.apellido,
                email : this.state.email,
                cifnif : this.state.cifnif,
                password : this.state.password,
                newsletter : this.state.newsletter
            };
            AuthService.register(diccionario).then((res)=>{
                console.log(res.token ? "Succes" : "Error")
                //Açi li retornem al component signIn que el usuari s'ha registrat
                res.token === "Success" ? this.props.stat(true) : this.props.stat(false);
            }).catch((err)=>{
                this.setState({error:err})
            })
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
    validateData(){
        let res = false;
        if (!this.state.email.match(/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/)) {
            this.setState({errorEmail: Utils.translate("register-error-email")})
            res = true;
        }
        if (this.state.password != this.state.password2) {
            this.setState({ errorPassword: Utils.translate("register-error-pass")});
            this.setState({ errorPassword2: Utils.translate("register-error-pass")});
            res = true;
        }
        if (this.state.captcha != true){
            this.setState({ errorCaptcha: Utils.translate("register-error-captcha")});
            res = true;
        }
        return res;
    }
    render() {
		return (
			<section id="register">
                <h1>{Utils.translate("register-title")}</h1>
                <form>
                    <h3 className="errors">{this.state.error}</h3>
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
                            <input required value={this.state.email} onChange={(e)=>this.updateInput(e,'email')} placeholder={Utils.translate("register-email")} pattern="^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$"></input>
                            <br/><span className="errors">{this.state.errorEmail}</span>
                        </div>
                        <div className="register--content">
                            {/* CIF/NIF */}
                            <h4>{Utils.translate("register-cifnif")}</h4>
                            <input required value={this.state.cifnif} onChange={(e)=>this.updateInput(e,'cifnif')} placeholder={Utils.translate("register-cifnif")} size="10" maxLength="9" pattern="^[0-9]{8}[a-zA-Z]{1}$"></input>
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
                            <input type="checkbox" value={this.state.newsletter} onClick={()=>{ if(this.state.newsletter) {this.setState({newslater:false}) }else{ this.setState({newslater:true}) } }}></input>
                            <a> {Utils.translate("register-newsletter")}</a>
                        </div>
                    </div>
                    <button className="login-button btn" onClick={(e)=>this.registerSubmit(e)}>{Utils.translate("register-button")}</button>
                </form>
                <div id="captcha">
                    <Reaptcha
                    ref={this.recaptchaRef}
                    sitekey={Settings.captchaSiteKey}
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
			</section>
		);
    }
}
const mapDispatchToProps = dispatch =>({

});
const mapStateToProps = state => ({
    ...state.registerReducer
});

export default connect(mapStateToProps,mapDispatchToProps)(Register);
