/** @module RegisterComponent */
import React from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import Reaptcha from 'reaptcha';
import { updateField } from './registerActions';


const mapDispatchToProps = dispatch =>({
  updateInput: (data, field) =>
    dispatch(updateField(data, field))
})
const mapStateToProps = state => ({
    ...state.registerReducer
});
/**
 * @class
 * Draw Register Form.
 */
class Register extends React.Component  {
  constructor(){
    super();
  }

  render(){

    return (
      <section id="register">
        <h1>{this.context.t("register-title")}</h1>
        <form>
            <div className="register--containers">
            <div className="register--content">
                {/* NOM */}
                <h4>{this.context.t("register-name")}</h4>
                <input value={this.props.nombre} onChange={(e)=>this.props.updateInput(e.target.value,'nombre')} placeholder={this.context.t("register-name")}></input>
            </div>
            <div className="register--content">
                {/* COGNOMS */}
                <h4>{this.context.t("register-surname")}</h4>
                <input value={this.props.apellido} onChange={(e)=>this.props.updateInput(e.target.value,'apellido')} placeholder={this.context.t("register-surname")}></input>
            </div>
            <div className="register--content">
                {/* CORREU */}
                <h4>{this.context.t("register-email")}</h4>
                <input value={this.props.email} onChange={(e)=>this.props.updateInput(e.target.value,'email')} placeholder={this.context.t("register-email")}></input>
            </div>
            <div className="register--content">
                {/* CIF/NIE */}
                <h4>CIF/NIE</h4>
                <input value={this.props.cifnif} onChange={(e)=>this.props.updateInput(e.target.value,'cifnif')} placeholder="CIF/NIE"></input>
            </div>
        </div>
        <div className="register--containers">
            <div className="register--content">
                {/* PASSW */}
                <h4>{this.context.t("register-passs")}</h4>
                <input type="password" value={this.props.password} onChange={(e)=>this.props.updateInput(e.target.value,'password')} placeholder={this.context.t("register-passs")}></input>
            </div>
            <div className="register--content">
                {/* PASSW */}
                <h4>{this.context.t("register-repeatPassw")}</h4>
                <input type="password" value={this.props.password2} onChange={(e)=>this.props.updateInput(e.target.value,'password2')} placeholder={this.context.t("register-repeatPassw")}></input>
            </div>
        </div>
        <div className="register--checkbox">
            <div>
                {/* CHECK POLITICA PRIV */}
                <input type="checkbox" onChange={(e)=>this.props.updateInput(e.target.value, 'politica')}></input>
                <a href="/#legal"> {this.context.t("register-legal")} </a>
            </div>
            <div>
                {/* CHECK NO REBRE OFERTES */}
                <input type="checkbox"></input>
                <a> {this.context.t("register-newsletter")}</a>
            </div>
        </div>
        <div id="captcha">
            <Reaptcha
            ref={this.recaptchaRef}
            sitekey="6LesI4IUAAAAAHHx9B6OuMjqpVl9bIyLOT3n4y3C"
            onVerify={() => this.props.updateInput(true, 'captcha')}
            onExpire={() => this.props.updateInput(false, 'captcha')}
            />
        </div>

        <button className="login-button btn" onClick={()=>this.props.register({nombre:this.props.nombre, apellido: this.props.apellido, email: this.props.email, password: this.props.password, password2: this.props.password2, captcha: this.props.captcha})}>{this.context.t("register-button")}</button>

    </form>
</section>
    )
  }
}
Register.contextTypes = {
    t: PropTypes.func.isRequired
}
export default connect(mapStateToProps,mapDispatchToProps)(Register);
