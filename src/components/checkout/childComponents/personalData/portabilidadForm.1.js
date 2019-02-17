/** @module ComponentsApp */
import React from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

import { Button } from 'semantic-ui-react'
import {
    updateContactDataFormServices
} from "../../../../actions/personalDataFormActions";

import {validator}  from "./validation";

const initialState = {
    /* etc */
};
/**
 * @class
 * This component contain the Portabilidad Data Form
 */
class PortabilidadForm extends React.Component  {

    constructor(props) {
        super(props);
        
        this.state = {};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClickOptions = this.handleClickOptions.bind(this);
        this.companies=[]
        this.company = React.createRef()
        this.state.tipo="alta"
        this.state.key = this.props.id
        this.state.tipoTlf = this.props.tipo
        this.state.value = {}
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
        /** 
         * The component change its own state and send a dispatch to redux
         * this.props.updateField "updateField" is a function which come from its father
         */

        this.setState(prevState => ({...prevState,
            value: {
                ...prevState.value,
                [name]: {
                    valor: value,
                    error: error
                }
            }
        }), () => this.props.updateField(updateContactDataFormServices({
            [name]: {
                error: error,
                valor: value,
            },
            key: this.props.id,
            name: name
        })))
        
    }

    
    componentWillReceiveProps(newProps) {     
        //console.log("-----------newProps", newProps.datosProductos)
        if (newProps.companies.length > 0)
            this.companies = newProps.companies
        if (Object.keys(newProps.datosProductos).length>0) {
           //console.log("-----------newPropsssssssssssssssss", newProps.datosProductos.value)
            this.setState({
                tipo: newProps.datosProductos.tipo,
                value: newProps.datosProductos.value === undefined ? {} : newProps.datosProductos.value,
            })
        }
    }

    componentDidMount() {
        if (this.props.dataProducts) {
            let product = this.props.dataProducts
        }        
    }

    handleClickOptions(type, id){
        if (this.state.tipo != type ) {
            if (this.state.tipo === "portabilidad") {
                this.setState({
                        tipo: type,
                    }, () => this.props.updateField(updateContactDataFormServices({tipo: type,key: this.props.id})))
            }else{
                this.setState({tipo: type, value:{}}, 
                            ()=>this.props.updateField(updateContactDataFormServices(this.state)))
            }
        }        
    }

    handleSubmit(event) {
        event.preventDefault();
        alert('A name was submitted: ');
    }

    render() {
        //console.log("this.state...........", this.state, typeof(this.state))
        let form;
        if (this.state.tipo === "portabilidad") {
            form=(<form onSubmit={this.handleSubmit}>
                    <div className="grid-data-form__fields">
                        <div>
                            <select
                            className = "form-control form-control-lg mio" 
                            onChange={this.handleInputChange} 
                            ref = "company"
                            value={!this.state.value.company?"":this.state.value.company.valor}
                            name="company">
                                <option value=""></option>         
                                {this.companies.map((item, i) => <option key={i} value={item}>{item}</option>)}                   
                            </select>
                            <span className="text-danger">{(!this.state.value.company ||!this.state.value.company.error)? "":(this.state.value.company.error)}</span>
                        </div>

                       <div style={{display:`${this.props.tipo=='fijo'?'none':'block'}`}}>
                            <input
                            className="form-control form-control-lg mio"
                            placeholder="Numeros de la sim"
                            name = "sim"
                            value={!this.state.value.sim?"":this.state.value.sim.valor}
                            type = "number"
                            onChange={this.handleInputChange} />
                            <span className="text-danger">{(!this.state.value.sim ||!this.state.value.sim.error)? "":(this.state.value.sim.error)}</span>
                        </div>

                        <div>
                            <input
                            className="form-control form-control-lg mio"
                            placeholder="movil"
                            name = "phone"
                            value={!this.state.value.phone?"":this.state.value.phone.valor}
                            type = "number"
                            onChange={this.handleInputChange} />
                            <span className="text-danger">{(!this.state.value.phone ||!this.state.value.phone.error)? "":(this.state.value.phone.error)}</span>
                        </div> 
                    </div>
                    
                    {/* <button type="submit" className="btn btn-large btn-block btn-default">Save data</button> */}
                    
                </form>)
        }else{
            form=(this.props.tipo=="fijo"?(<p>Nos pondremos en contacto con usted para la instalacion</p>):(<p>Se le asignara un numero nuevo telefono y se lo enviaremos a la direccion indicada</p>))
        }

        return (
            <div id={this.props.id}>
                <div style={{height:"60px"}}>
                    <h2>Linea {`${parseInt(this.props.id)+1} ${this.props.tipo.toUpperCase()}`}</h2>
                </div>
                <Button.Group size='large' className="centrar">
                    <Button positive={this.state.tipo==="portabilidad"?true:false} onClick={() => this.handleClickOptions("portabilidad",this.props.id )}>Portabilidad</Button>
                    
                    <Button.Or />
                    <Button positive={this.state.tipo==="alta"?true:false} onClick={() => this.handleClickOptions("alta", this.props.id)}>Alta</Button>
                </Button.Group>
                
                {form}
            </div>
            
        );
    }


}
export default PortabilidadForm;
