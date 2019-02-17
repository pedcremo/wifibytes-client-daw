/** @module ComponentsApp */
import React from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
import { connect } from "react-redux";

import { Button } from 'semantic-ui-react'
import {
    getItems,
    initDataServices
} from "../../../../actions/personalDataFormActions";
import {validator}  from "./validation";

const mapDispatchToProps = (dispatch) => ({
    getItems: () => dispatch(getItems()),
    initDataServices: data => dispatch(initDataServices(data)),
});

const mapStateToProps = state => ({
    ...state.cartReducer,
    ...state.personalDataForm
});

/**
 * @class
 * This component contain the Portabilidad Data Form
 */
class PortabilidadForm extends React.Component  {

    constructor(props) {
        super(props);
        
        console.log(this.props)
        //alert("cts")
    }

   

    componentDidMount() {
        //const {items, initDataServices} = this.props;
        const {getItems} = this.props;
        new Promise((resolve, reject) => resolve(getItems()))
        .then( () => {
            const {items, initDataServices} = this.props;
            console.log("this.props)", items)
            initDataServices(items)
        })
    }

    handleClickOptions(type){
        /* if (this.state.tipo != type ) {
            if (this.state.tipo === "portabilidad") {
                this.setState({
                        tipo: type,
                    }, () => this.props.updateField(updateContactDataFormServices({tipo: type,key: this.props.id})))
            }else{
                this.setState({tipo: type, value:{}}, 
                            ()=>this.props.updateField(updateContactDataFormServices(this.state)))
            }
        } */        
    }

    componentDidUpdate(){
        /* alert("Ww")
        const { items, datosProductos }=this.props;        
        console.log(items, datosProductos)
         if (items.length > 0) {
             initDataServices("okokok")
         } */
        
    }
    render() {
        /* let form;
        const { items, datosProductos }=this.props;        
        console.log(items, datosProductos)
         if (items.length > 0) {
             initDataServices("okokok")
         } */
        
        /* if (this.state.tipo === "portabilidad") {
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
                            <span className="text-danger">{(!this.state.error||this.state.error==undefined)? "":this.state.error}</span>
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
                    
                    
                </form>)
        }else{
            form=(this.props.tipo=="fijo"?(<p>Nos pondremos en contacto con usted para la instalacion</p>):(<p>Se le asignara un numero nuevo telefono y se lo enviaremos a la direccion indicada</p>))
        } */

        return (
            <div>
               {/*  <Button.Group size='large' className="centrar">
                    <Button positive={true} onClick={() => this.handleClickOptions("portabilidad")}>Portabilidad</Button>
                    
                    <Button.Or />
                    <Button positive={false} onClick={() => this.handleClickOptions("alta",)}>Alta</Button>
                </Button.Group> */}
                
            </div>
            
        );
    }


}
export default connect(mapStateToProps, mapDispatchToProps)(PortabilidadForm);