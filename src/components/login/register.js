/** @module ComponentsApp */
import React from 'react';
import {Utils} from "../../utils";
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
	}
	
	componentDidMount(){

    }

    /** render  */
    render() {          
		return (
			<section id="register">
                <h1>{Utils.translate("register-title")}</h1>
                <form>
                    <div className="register--containers">
                        <div className="register--content">
                            {/* NOM */}
                            <h4>{Utils.translate("register-name")}</h4>
                            <input placeholder={Utils.translate("register-name")}></input>
                        </div>
                        <div className="register--content">
                            {/* COGNOMS */}
                            <h4>{Utils.translate("register-surname")}</h4>
                            <input placeholder={Utils.translate("register-surname")}></input>
                        </div>
                        <div className="register--content">
                            {/* CORREU */}
                            <h4>{Utils.translate("register-email")}</h4>
                            <input placeholder={Utils.translate("register-email")}></input>
                        </div>
                    </div>
                    <div className="register--containers">
                        <div className="register--content">
                            {/* PASSW */}
                            <h4>{Utils.translate("register-passs")}</h4>
                            <input placeholder={Utils.translate("register-passs")}></input>
                        </div>
                        <div className="register--content">
                            {/* PASSW */}
                            <h4>{Utils.translate("register-repeatPassw")}</h4>
                            <input placeholder={Utils.translate("register-repeatPassw")}></input>
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

                    <button class="login-button btn" onClick={console.log('button')}>{Utils.translate("register-button")}</button>

                </form>
			</section>
		);
    }

    submit (text) {
        console.log(text);
        console.log('aqui');
        alert(text);
    }
}
export default Register;