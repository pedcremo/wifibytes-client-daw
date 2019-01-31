/** @module ComponentsApp */
import React from 'react';
import {T} from "../../../../utils";

/**
 * @class
 * This component contain the Personal Data Form
 */
class typeCliente extends React.Component  {
    constructor(props) {
        super(props);
        const conten = {value:"",}
        this.state = {
            dni: conten,
            cif: conten,
            nie: conten
        };
    }

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
        return new Promise((resolve, reject) => 
            resolve(this.setState({
                [name]: {
                    value: value,
                    error: error
                }
            }))
        )
    }

    render() {
        console.log("Aqui llega")
        console.log(this.props.type)
        debugger
            switch (this.props.type) {
                case 0:
                case 5:
                        return (
                            <div>
                                <h4>Introduzca su dni: </h4>
                                <input                        
                                className={"form-control form-control-lg "+ (!this.state.dni.error? "":"border border-danger")}
                                placeholder="DNI"
                                name="dni"
                                type="text"
                                pattern="/^[a-z]{3}[0-9]{6}[a-z]?$/i"
                                value={this.state.dni.value}
                                onChange={this.handleInputChange} />
                                <span className="text-danger">{!this.state.dni.error? "":this.state.dni.error}</span>
                            </div>
                        );
                    break;
                case 1:
                    return (
                        <div>
                            <h4>Introduzca el cif de la empresa: </h4>
                            <input                        
                            className={"form-control form-control-lg "+ (!this.state.cif.error? "":"border border-danger")}
                            placeholder="CIF"
                            name="cif"
                            type="text"
                            pattern="/^[a-z]{3}[0-9]{6}[a-z]?$/i"
                            value={this.state.cif.value}
                            onChange={this.handleInputChange} />
                            <span className="text-danger">{!this.state.cif.error? "":this.state.cif.error}</span>
                        </div>
                    );
                break;
                case 2:
                    return (
                        <div>
                            <h4>Introduzca su nie: </h4>
                            <input                        
                            className={"form-control form-control-lg "+ (!this.state.nie.error? "":"border border-danger")}
                            placeholder="NIE"
                            name="nie"
                            type="text"
                            pattern="/^[a-z]{3}[0-9]{6}[a-z]?$/i"
                            value={this.state.nie.value}
                            onChange={this.handleInputChange} />
                            <span className="text-danger">{!this.state.nie.error? "":this.state.nie.error}</span>
                        </div>
                    );
                break;
            }
    }


}
export default typeCliente;


/**
 * 
 * <h4>Introduzca su dni: </h4>
                        <input                        
                        className={"form-control form-control-lg "+ (!this.state.dni.error? "":"border border-danger")}
                        placeholder="DNI"
                        name="dni"
                        type="text"
                        required
                        pattern="/^[a-z]{3}[0-9]{6}[a-z]?$/i"
                        value={this.state.dni.value}
                        onChange={this.handleInputChange} />
                        <span className="text-danger">{!this.state.dni.error? "":this.state.dni.error}</span>
 */