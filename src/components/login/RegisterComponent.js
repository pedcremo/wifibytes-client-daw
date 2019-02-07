/** @module RegisterComponent */
import React from 'react';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import Reaptcha from 'reaptcha';
import { updateField, register, errorField } from './registerActions';
import {Utils} from "../../utils";
import {Input, Dropdown } from 'semantic-ui-react';

const mapDispatchToProps = dispatch=>({
  updateInput: (data, field, ...data2) =>{
    dispatch(updateField(data, field))
    switch (field) {
      case 'nombre':
        if(data.length < 4){
          dispatch(updateField(true, 'errorNombre'))
        }else{
          dispatch(updateField(false, 'errorNombre'))
        }
        break;
      case 'apellido':
        if(data.length < 3){
          dispatch(updateField(true, 'errorApellido'))
        }else{
          dispatch(updateField(false, 'errorApellido'))
        }
        break;
      case 'email':
        if(!data.match(/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/)){
          dispatch(updateField(true, 'errorEmail'))
        }else{
          dispatch(updateField(false, 'errorEmail'))
        }
        break;
      case 'nifnie':
        if(data == 'nif'){
          if(!data2[0].match(/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i)){
            dispatch(updateField(true, 'errorCifnif'))
          }else{
            dispatch(updateField(false, 'errorCifnif'))
          }
        }else{
          if(!data2[0].match(/^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/i)){
            dispatch(updateField(true, 'errorCifnif'))
          }else{
            dispatch(updateField(false, 'errorCifnif'))
          }
        }
        break;
      case 'cifnif':
        if(data2 == 'nif'){
          if(!data.match(/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i)){
            dispatch(updateField(true, 'errorCifnif'))
          }else{
            dispatch(updateField(false, 'errorCifnif'))
          }
        }else{
          if(!data.match(/^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/i)){
            dispatch(updateField(true, 'errorCifnif'))
          }else{
            dispatch(updateField(false, 'errorCifnif'))
          }
        }
        break;
      case 'password':
        if(data.length < 8){
          dispatch(updateField(true, 'errorPassword'))
          if(data == data2){
            dispatch(updateField(false, 'errorPassword2'))
          }
        }else{
          dispatch(updateField(false, 'errorPassword'))
          if(data == data2){
            dispatch(updateField(false, 'errorPassword2'))
          }
        }
        break;
      case 'password2':
        if(data != data2){
          dispatch(updateField(true, 'errorPassword2'))
        }else{
          dispatch(updateField(false, 'errorPassword2'))
        }
        break;
    }
  },
  register: (data) => {
    console.log(data)
    dispatch(register(data))
  }
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
    const options = [
      {key: 'nif', text:'NIF', value:'nif'},
      {key: 'nie', text:'NIE', value:'nie'}
    ]
    return (
      <section id="register">
        <h1 style={{color:'black'}}>{this.context.t("register-title")}</h1>
        <form>
            <div className="register--containers">
            <div className="register--content">
                {/* NOM */}
                <h4 style={{color:'black'}}>{this.context.t("register-name")}</h4>
                <Input
                  placeholder={this.context.t('register-name')}
                  onChange={(e)=>this.props.updateInput(e.target.value,'nombre')}
                />
                <br/><span className="errors" hidden={!this.props.errorNombre}>{this.context.t('register-error-name')}</span>
            </div>
            <div className="register--content">
                {/* COGNOMS */}
                <h4 style={{color:'black'}}>{this.context.t("register-surname")}</h4>
                <Input
                  placeholder={this.context.t('register-surname')}
                  onChange={(e)=>this.props.updateInput(e.target.value,'apellido')}
                />
                <br/><span className="errors" hidden={!this.props.errorApellido}>{this.context.t('register-error-apellido')}</span>
            </div>
            <div className="register--content">
                {/* CORREU */}
                <h4 style={{color:'black'}}>{this.context.t("register-email")}</h4>
                <Input
                  placeholder={this.context.t('register-email')}
                  onChange={(e)=>this.props.updateInput(e.target.value,'email')}
                />
                <br/><span className="errors" hidden={!this.props.errorEmail}>{this.context.t('register-error-email')}</span>
            </div>
            <div className="register--content">
                {/* CIF/NIE */}
                <h4 style={{color:'black'}}>NIF/NIE</h4>
                <Input
                  label={<Dropdown defaultValue={this.props.nifnie} onChange={(e,{value}) =>this.props.updateInput(value, 'nifnie', this.props.cifnif)} options={options} />}
                  labelPosition='left'
                  placeholder='NIF/NIE'
                  onChange={(e)=>this.props.updateInput(e.target.value,'cifnif', this.props.nifnie)}
                />
                <br/><span className="errors" hidden={!this.props.errorCifnif}>{this.context.t('register-error-cifnif')}</span>
            </div>
        </div>
        <div className="register--containers">
            <div className="register--content">
                {/* PASSW */}
                <h4 style={{color:'black'}}>{this.context.t("register-passs")}</h4>
                <Input
                  type="password"
                  placeholder={this.context.t('register-passs')}
                  onChange={(e)=>this.props.updateInput(e.target.value,'password', this.props.password2)}
                />
                <br/><span className="errors" hidden={!this.props.errorPassword}>{this.context.t('register-error-password')}</span>
            </div>
            <div className="register--content">
                {/* PASSW */}
                <h4 style={{color:'black'}}>{this.context.t("register-repeatPassw")}</h4>
                <Input
                  type="password"
                  placeholder={this.context.t('register-repeatPassw')}
                  onChange={(e)=>this.props.updateInput(e.target.value,'password2', this.props.password)}
                />
                <br/><span className="errors" hidden={!this.props.errorPassword2}>{this.context.t('register-error-password2')}</span>
            </div>
        </div>
        <div className="register--checkbox">
            <div>
                {/* CHECK POLITICA PRIV */}
                <input type="checkbox" onClick={()=>this.props.updateInput(!this.props.politica, 'politica')}></input>
                <a href="/#legal"> {this.context.t("register-legal")} </a>
            </div>
            <div>
                {/* CHECK NO REBRE OFERTES */}
                <input type="checkbox" onClick={()=>this.props.updateInput(!this.props.ofertas, 'ofertas')}></input>
                <a style={{color:'black'}}> {this.context.t("register-newsletter")}</a>
            </div>
        </div>
        <div id="captcha">
            <Reaptcha
            ref={this.recaptchaRef}
            sitekey="6LesI4IUAAAAAHHx9B6OuMjqpVl9bIyLOT3n4y3C"
            onVerify={() => this.props.updateInput(true, 'captcha')}
            onExpire={() => this.props.updateInput(false, 'captcha')}
            hl={Utils.getUserLang() == "va" ? "es" : Utils.getUserLang()}
            />
        </div>

        <button
          className="login-button btn"
          onClick={(e)=>(e.preventDefault(), this.props.register({nombre:this.props.nombre, apellido: this.props.apellido, cifnif:this.props.cifnif, email: this.props.email, password: this.props.password}))}
          disabled={!this.props.nombre || !this.props.apellido || !this.props.email || !this.props.cifnif || !this.props.password || !this.props.password2 || !this.props.politica || !this.props.captcha || this.props.errorNombre || this.props.errorApellido || this.props.errorEmail || this.props.errorCifnif || this.props.errorPassword || this.props.errorPassword2}
          >{this.context.t("register-button")}</button>

    </form>
</section>
    )
  }
}
Register.contextTypes = {
    t: PropTypes.func.isRequired
}
export default connect(mapStateToProps,mapDispatchToProps)(Register);
