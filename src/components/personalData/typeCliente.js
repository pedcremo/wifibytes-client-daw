/** @module ComponentsApp */
import React from 'react';
import {T} from "../../utils";

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

    render() {
            switch (this.props.type) {
                case "0":
                case "5":
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
                case "1":
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
                case "2":
                    return (
                        <div>
                            <h4>Introduzca su nie: </h4>
                            <input                        
                            className={"form-control form-control-lg "+ (!this.state.nie.error? "":"border border-danger")}
                            placeholder="NIE"
                            name="nie"
                            type="text"
                            pattern="/^[a-z]{3}[0-9]{6}[a-z]?$/i"
                            value={this.state.cif.value}
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