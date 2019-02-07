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
        this.companies=[]
        this.company = React.createRef()
        this.state.tipo="alta"
        this.state.key = this.props.id
        this.state.tipoTlf = this.props.tipo
        this.comprobacion = this.comprobacion.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClickOptions = this.handleClickOptions.bind(this);
    }

    // changeState(name, value){
    //     console.log(name)
    //     console.log(value)
    //     //console.log(error)
    //     this.setState({
    //         [name]: {
    //             value: value,
    //             key: this.props.id,
    //             //error: error
    //         }
    //     },()=>{ this.props.updateField(updateContactDataFormServices(this.state))
    //         this.comprobacion()
    //     })
    // }

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

        //this.changeState(name,value)

        /** 
         * The component change its own state and send a dispatch to redux
         * this.props.updateField "updateField" is a function which come from its father
         */
        return new Promise((resolve, reject) =>
        resolve(this.setState({                
                    [name]: value,
                    key: this.props.id
                
            }))
        )
        .then(() => this.props.updateField(updateContactDataFormServices(this.state)))        
        
    }

    comprobacion(){
        let a = false;
        try{
            Object.values(this.state).forEach((element, i) => {
                if (((element.value.length > 1 || element.value.toString().length >= 1) && element.value !== "") &&
                    (element.error === "" || element.error === undefined || !element.error)){
                    a = true;
                }else{
                    a = false;
                    BreakException;
                }
            });
            if (a){
                new Promise((resolve, reject) =>{
                    resolve(this.props.valid("personalDataViewIsValid",true))
                }).then(()=>console.log(this.props.value))
            }
        }catch(e){
            a = false;
            console.log("No valido")
        }
}

    
    componentWillReceiveProps(newProps) {     
        console.log("-----------newProps",newProps.dataProducts)
        if (newProps.companies.length > 0)
            this.companies = newProps.companies
        if (Object.keys(newProps.datosProductos).length>0) {
            for (const key in newProps.datosProductos.value) {
                this.setState({
                    [key]: `${newProps.datosProductos.value[key]}`
                })
            }
        }
    }

    
    componentDidMount() {
        
        if (this.props.dataProducts) {
            let product = this.props.dataProducts
            console.warn(product)
        }        
    }

    handleClickOptions(type, id){
        if (this.state.tipo != type ) {
            if (this.state.tipo === "portabilidad") {
                this.setState({},
                    ()=>this.setState({
                        tipo: type,
                        key: this.props.id
                    }, () => this.props.updateField(updateContactDataFormServices({tipo: type,key: this.props.id}))))
            }else{
                this.setState({}, 
                    ()=>this.setState({tipo: type, key: this.props.id}, 
                            ()=>this.props.updateField(updateContactDataFormServices(this.state))))
            }
        }        
    }

    /* handleClickSaveData(type, id){
        if (type === "portabilidad") {
            console.warn(this.refs.company.value)
        }
    } */

    handleSubmit(event) {
        event.preventDefault();
        alertalert('A name was submitted: ');
    }

    render() {
        let form;
        //console.log(this.props.tipo, this.props.id)
        if (this.state.tipo === "portabilidad") {
            form=(<form onSubmit={this.handleSubmit}>
                    <div className="grid-data-form__fields">
                        <div>
                            <select
                            className = "form-control form-control-lg mio" 
                            onChange={this.handleInputChange} 
                            ref = "company"
                            value={!this.state.company?"":this.state.company}
                            name="company">
                                <option value=""></option>         
                                {this.companies.map((item, i) => <option key={i} value={item}>{item}</option>)}                   
                            </select>
                            
                        </div>

                       <div style={{display:`${this.props.tipo=='fijo'?'none':'block'}`}}>
                            <input
                            className="form-control form-control-lg mio"
                            placeholder="Numeros de la sim"
                            name = "sim"
                            value={!this.state.sim?"":this.state.sim}
                            type = "number"
                            onChange={this.handleInputChange} />
                        </div>

                        <div>
                            <input
                            className="form-control form-control-lg mio"
                            placeholder="movil"
                            name = "phone"
                            value={!this.state.phone?"":this.state.phone}
                            type = "number"
                            onChange={this.handleInputChange} />
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
