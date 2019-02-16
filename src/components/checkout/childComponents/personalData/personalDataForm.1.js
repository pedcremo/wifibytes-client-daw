
/** @module ComponentsApp */
import React from 'react';
import Swal from 'sweetalert2';

import {
    updateContactDataForm,
    getContactDataForm,
    updateField
} from "../../../../actions/personalDataFormActions";
import {validator}  from "./validation";
import Typecliente from './typeCliente';
import { connect } from "react-redux";





const mapDispatchToProps = dispatch => ({
    updateField: data => dispatch(updateField(data, field)),
});

const mapStateToProps = state => ({
    ...state.fields
});




/* const mapDispatchToProps = dispatch => ({
    login: data => dispatch(login(data)),
    recoverPass: email => dispatch(recoverPass(email)),
    changeValue: (value, target) => dispatch(changeValue(value, target))
});

const mapStateToProps = state => ({
    ...state.loginReducer
});



export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(Login); */
    




    /**
 * @class
 * This component contain the Personal Data Form
 */
class PersonalForm extends React.Component  {
    
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }


    componentDidMount() {
        this.props.dispatch(getContactDataForm());
    }
    /** 
     * This method is listening changes of each form element 
     * The redux state of this form also change 
     */
    handleInputChange(event) {
        
        const target = event.target;
        // = target.type === 'checkbox' ? target.checked : target.value;
        let value;
        const name = target.name;
        /** 
         * Check what kind of type is each element and transform them
         */
        if (target.type === "number") 
            value = Number(target.value)
        else if (target.type === 'checkbox')
            value = target.checked
        else
            value = target.value

        /** 
         * Return a error if a field is incorrect 
         */
        const error = validator(value, name, target.type)
        console.log("this.props.dataUser", this.props.datosPersonales)
        //this.props.dispatch(updateContactDataForm(this.props.datosPersonales))
        
    }


    
    render() {
        /* const {loading,} = this.props; */

        console.warn(this.props.datosPersonales)
        
        return (
            <form className="grid-data-form">
               <div>
                    <h2>Personal Data</h2>
                    <div>
                        <input
                        className="form-control form-control-lg mio"
                        placeholder="Name"
                        name="name"
                        type="text"
                        value={this.props.datosPersonales.name}
                        onChange={(e)=>this.props.updateField(e.target.value,e.target.value)} />
                        
                        {/* <span className="text-danger">{!this.state.name.error? "":this.state.name.error}</span> */}
                    </div>

                    <br />
                    <div>
                        <input
                        className="form-control form-control-lg"
                        placeholder="Surname"
                        name = "surname"
                        type="text"
                        value={this.props.datosPersonales.surname}
                        onChange={this.handleInputChange} />
                        {/* <span className="text-danger">{!this.state.surname.error? "":this.state.surname.error}</span> */}
                    </div>

                    {/* <br />
                    <div>
                        <input
                        className="form-control form-control-lg"
                        placeholder="Email"
                        name = "email"
                        ref = "email"
                        type="email"
                        value={this.state.email.value}
                        onChange={this.handleInputChange} />
                        <span className="text-danger">{!this.state.email.error? "":this.state.email.error}</span>
                    </div>
                    <br />
                    <div>
                        <h4>Fecha de nacimiento: </h4>
                        <input className="form-control form-control-lg"
                        name="date"
                        ref = "date"
                        type="date"
                        value={this.state.date.value}
                        onChange={this.handleInputChange}/>
                        <span className="text-danger">{!this.state.date.error? "":this.state.date.error}</span>
                    </div>
                    <br/>
                    <div>
                        <h4>Suba una imagen de su dni</h4>
                        <input 
                        type="file"
                        id="dni" 
                        ref = "file"
                        name = "file"
                        onChange={this.previewFile} /><br/>
                        <img name="preview" ref="preview" src={this.state.preview.value} height="130" width="100%" alt="Image preview..."></img> 
                    </div>
                </div>

                <div>
                    <h2>Address</h2>
                    <div>
                        <input
                        className="form-control form-control-lg"
                        placeholder="Address"
                        name = "address"
                        ref = "address"
                        type = "text"
                        value={this.state.address.value}
                        onChange={this.handleInputChange} />
                        <span className="text-danger">{!this.state.address.error? "":this.state.address.error}</span>
                    </div>

                    <br />
                    <div>
                        <input
                        className="form-control form-control-lg"
                        placeholder="Zip"
                        name = "zip"
                        ref = "zip"
                        type="number"
                        value={this.state.zip.value}
                        onChange={this.handleInputChange} />
                        <span className="text-danger">{!this.state.zip.error? "":this.state.zip.error}</span>
                    </div>

                    <br />
                    <div>
                        <input                      
                        className={"form-control form-control-lg "+ (!this.state.city.error? "":"border border-danger")}
                        placeholder="City"
                        name = "city"
                        ref = "city"
                        type="text"
                        value={this.state.city.value}
                        onChange={this.handleInputChange} />
                        <span className="text-danger">{!this.state.city.error? "":this.state.city.error}</span>
                    </div>

                    <br />
                    <div>
                        <input                      
                        className={"form-control form-control-lg "+ (!this.state.cuenta.error? "":"border border-danger")}
                        placeholder="Cuenta bancaria"
                        name = "cuenta"
                        ref = "cuenta"
                        type="text"
                        value={this.state.cuenta.value}
                        onChange={this.handleInputChange} />
                        <span className="text-danger">{!this.state.cuenta.error? "":this.state.cuenta.error}</span>
                    </div>


                    <br />
                    <div>
                        <h4>Introduzca el tipo de cliente: </h4>
                        <select 
                        name="tipcli" 
                        ref = "tipcli"
                        onChange={this.handleInputChange} 
                        className={"form-control form-control-lg "+ (!this.state.tipcli.error? "":"border border-danger")}>
                            <option value=""></option>   
                            {cli.map((a, i)=>{
                                    return <option key={i} value={this.props.tipCliente[a]}>{a}</option>
                            })}     
                        </select>
                        <span className="text-danger">{!this.state.tipcli.error? "" :this.state.tipcli.error}</span>
                    </div>
                    <br /> */}
                    
                </div >
            </form>
        );
    }
}
/* 
const mapStateToProps = state => ({
    datosPersonales: state.personalDataForm.fields.datosPersonales,
    loaded: state.personalDataForm.loaded,
    error: state.personalDataForm.error,
}); */

/* export default connect(mapStateToProps)(PersonalForm); */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PersonalForm);