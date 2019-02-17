
/** @module ComponentsApp */
import React from 'react';
import Swal from 'sweetalert2';
import {
    Utils
} from '../../../../utils'
import {    
    updateField,
    initDatosPersonales
} from "../../../../actions/personalDataFormActions";
import {validator}  from "./validation";
/* import Typecliente from './typeCliente'; */
import { connect } from "react-redux";


    


const mapDispatchToProps = (dispatch) => ({
    updateField: (data, field, error) => dispatch(updateField(data, field, error)),
    initDatosPersonales: data => dispatch(initDatosPersonales(data))
});
/*trae el estado del reducer root*/
const mapStateToProps = state => ({
    ...state.personalDataForm.datosPersonales
});

    /**
 * @class
 * This component contain the Personal Data Form
 */
class PersonalForm extends React.Component  {
    
    constructor(props) {
        super(props);
        /* this.handleInputChange = this.handleInputChange.bind(this); */
    }

    componentDidMount(){        
        const {initDatosPersonales} = this.props;
        const token = Utils.getCookie("jwt");
        console.log("this.props", this.props)
        if (token) {
            Utils.post('/api-token-verify/', {token: token})
            .then(
                res => {
                    console.log(res)
                    Utils.get(`/cliente/${res.id_consumer}/`, null, true)
                    .then(
                        res => {
                            console.log(res)
                            initDatosPersonales(res)
                            /*despach de objeto con acciones*/                                              
                        },
                        error => {
                            /* arrancar el formulario con estado inicial */
                            console.log('cliente/${res.id_consumer : ', error);}
                    );
                },
                error => {
                    /*deberia abrirse el modal y arrancar el formulario con estado inicial*/
                    console.log('ERROR Utils.post ', error);}
            );
        }else{
            /*deberia abrirse el modal y arrancar el formulario con estado inicial*/
        }
    }
   
    


    
    render() {
        const {
            updateField,
            nombre        
        } = this.props;

        console.warn("RENDER DATAFORM", this.props, "------------------", nombre)
        /**
         * Es importante que el nombre de los inputs coincida con el combre del objeto en redux que guardara su value, ya que de esta manera reutilizamos el validador en el reducer cuando los datos son extaridos por primera vez o desde backend o desde localStorage
         */
        return (
            <form className="grid-data-form">
               <div>
                    <h2>Personal Data</h2>
                    <div>
                        <label>
                            Nombre
                            <input
                            className="form-control form-control-lg mio"
                            name="nombre"
                            type="text"
                            value={nombre}
                            onChange={ev => updateField(ev.target.value, ev.target.name, validator(ev.target.value, "nombre"))}
                            />
                        </label>
                        <br />
                        <span className="text-danger">{!nombre? "": validator(nombre, "nombre")}</span> 
                    </div>

                    <br />
                    <div>
                        {/* <input
                        className="form-control form-control-lg"
                        placeholder="Surname"
                        name = "surname"
                        type="text"
                        value={fields.datosPersonales.surname}
                        onChange={this.handleInputChange} /> */}
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
                        value={!this.state.email?"":this.state.email.value}
                        onChange={this.handleInputChange} />
                        <span className="text-danger">{!this.state.email? "":this.state.email.error}</span>
                    </div>
                    <br />
                    <div>
                        <h4>Fecha de nacimiento: </h4>
                        <input className="form-control form-control-lg"
                        name="date"
                        ref = "date"
                        type="date"
                        value={!this.state.date?"":this.state.date.value}
                        onChange={this.handleInputChange}/>
                        <span className="text-danger">{!this.state.date? "":this.state.date.error}</span>
                    </div>
                    <br/>
                    <div>
                        <h4>Suba una imagen de su dni</h4>
                        <input 
                        type="file"
                        id="file" 
                        ref = "file"
                        name = "preview"
                        onChange={this.previewFile} /><br/>
                        <img name="preview" ref="preview" src={!this.state.preview?"":this.state.preview.value} height="130" width="100%" alt="Image preview..."></img>
                        <span className="text-danger">{!this.state.preview? "":this.state.preview.error}</span>
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
                        value={!this.state.address?"":this.state.address.value}
                        onChange={this.handleInputChange} />
                        <span className="text-danger">{!this.state.address? "":this.state.address.error}</span>
                    </div>

                    <br />
                    <div>
                        <input
                        className="form-control form-control-lg"
                        placeholder="Zip"
                        name = "zip"
                        ref = "zip"
                        type="number"
                        value={!this.state.zip?"":this.state.zip.value}
                        onChange={this.handleInputChange} />
                        <span className="text-danger">{!this.state.zip? "":this.state.zip.error}</span>
                    </div>

                    <br />
                    <div>
                        <input                      
                        className={"form-control form-control-lg "+ (!this.state.city? "":"border border-danger")}
                        placeholder="City"
                        name = "city"
                        ref = "city"
                        type="text"
                        value={!this.state.city?"":this.state.city.value}
                        onChange={this.handleInputChange} />
                        <span className="text-danger">{!this.state.city? "":this.state.city.error}</span>
                    </div>

                    <br />
                    <div>
                        <input                      
                        className={"form-control form-control-lg "+ (!this.state.cuenta? "":"border border-danger")}
                        placeholder="Cuenta bancaria"
                        name = "cuenta"
                        ref = "cuenta"
                        type="text"
                        value={!this.state.cuenta?"":this.state.cuenta.value}
                        onChange={this.handleInputChange} />
                        <span className="text-danger">{!this.state.cuenta? "":this.state.cuenta.error}</span>
                    </div>


                    <br />
                    <div>
                        <h4>Introduzca el tipo de cliente: </h4>
                        <select 
                        name="tipcli" 
                        ref = "tipcli"
                        onChange={this.handleInputChange} 
                        className={"form-control form-control-lg "+ (!this.state.tipcli? "":"border border-danger")}>
                            <option value=""></option>   
                            {cli.map((a, i)=>{
                                    return <option key={i} value={this.props.tipCliente[a]}>{a}</option>
                            })}     
                        </select>
                        <span className="text-danger">{!this.state.tipcli? "" :this.state.tipcli.error}</span>
                    </div>
                    <br /> */}
                    
                </div >
            </form>
        );
    }
}

/* const mapStateToProps = state => ({
    datosPersonales: state.personalDataForm.fields.datosPersonales,
    loaded: state.personalDataForm.loaded,
    error: state.personalDataForm.error,
});

export default connect(mapStateToProps)(PersonalForm);
 */
export default connect(mapStateToProps, mapDispatchToProps)(PersonalForm);