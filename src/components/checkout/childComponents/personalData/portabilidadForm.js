/** @module ComponentsApp */
import React from 'react';
import { Button } from 'semantic-ui-react'
import {
    updateContactDataFormServices
} from "../../../../actions/personalDataFormActions";

import {validator}  from "./validation";
let po={
    1:"eeee",
    2:"000"
}
/**
 * @class
 * This component contain the Portabilidad Data Form
 */
class PortabilidadForm extends React.Component  {

    constructor(props) {
        super(props);
         const conten = {
             value: "",
         }
         this.state = {
         };
         this.handleInputChange = this.handleInputChange.bind(this);
         this.handleClick = this.handleClick.bind(this);
         this.companies=[]
         this.myRef = React.createRef();
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
        console.log("event", this.state)
        return new Promise((resolve, reject) =>
            resolve(this.setState({
                
                    [name]: value,
                    key: this.props.id
                
            }))
        )
        .then(() => this.props.updateField(updateContactDataFormServices(this.state)))
        

        
    }

    componentWillReceiveProps(newProps) {
        
        if (newProps.companies.length > 0)
            this.companies = newProps.companies
    }

    handleClick(e){
        return new Promise((resolve, reject) =>
            resolve(this.setState({
                tipo: e,
            }))
        ).then(() => console.log(this.state))
        
    }

    render() {
        let form;
        if (this.state.tipo!="portabilidad") {
            form=(<form>
                    <div className="grid-data-form__fields">
                        <div>
                            <select
                            className = "form-control form-control-lg mio" 
                            onChange={this.handleInputChange} 
                            name="company">
                                <option value=""></option>         
                                {
                                    this.companies.map((item, i) => {
                                        return <option key={i} value={item}>{item}</option>         
                                    })
                                }                   
                            </select>
                            
                        </div>

                       <div>
                            <input
                            className="form-control form-control-lg mio"
                            placeholder="Numeros de la sim"
                            name = "sim"
                            type = "number"
                            onChange={this.handleInputChange} />
                        </div>

                        <div>
                            <input
                            className="form-control form-control-lg mio"
                            placeholder="movil"
                            name = "phone"
                            type = "number"
                            onChange={this.handleInputChange} />
                        </div> 
                    </div>
                </form>)
        }else{
            form=(<p>Se le asignara un telefono y se lo enviaremos a la direccion indicada</p>)
        }

        console.log(this.state,this.props.id)
        return (
            <div id={this.props.id}>
                <Button.Group size='large' className="centrar">
                    <Button onClick={() => this.handleClick("portabilidad")}>Portabilidad</Button>
                    <Button.Or />
                    <Button onClick={() => this.handleClick("alta")}>Alta</Button>
                </Button.Group>
                
                {form}
            </div>
            
        );
    }


}
export default PortabilidadForm;
