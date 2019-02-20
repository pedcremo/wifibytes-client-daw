/** @module ComponentsApp */
import React from 'react';
import UserChoice from "./userChoice"
import PersonalDataForm from "./personalDataForm";
import SignIn from "../../../login/signIn";
import PortabilidadForm from "./portabilidadForm";
import { connect } from "react-redux";

import {getItems} from "../../../cart/cartActions";
import {
    setCompleted,
    setUncompleted,
    updateData
} from "../../../../actions/personalDataFormActions";

const mapDispatchToProps = (dispatch) => ({
    setCompleted: () => dispatch(setCompleted()),
    setUncompleted: () => dispatch(setUncompleted()),
    updateData: (key, data) => dispatch(updateData(key, data)),
});

const mapStateToProps = state => ({
    ...state.personalDataForm,
});

let mockClientes=[0, 5, 1, 2]
let mockCompanies=["orange", "vodafone", "jazztel", "yoigo", "pepephone"]

/**
 * @class
 * Draw Login. A form to login
 */
class Personal extends React.Component  {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);
       
    }

    componentDidUpdate(){
        const {
            validForms,
            setCompleted,
            setUncompleted,
            datosPersonales,
            datosProductos,
            updateData
        } = this.props
        if (validForms) {
            updateData("personalData", {
                datosPersonales,
                datosProductos
            })
            setCompleted()

        }else{
            setUncompleted()
        }
    }
    
    
    render() {
        
        return (
            <div>
                <PersonalDataForm tipCliente={mockClientes}/>
                
                <PortabilidadForm companies={mockCompanies}/>                    
            </div>
        );
    }
}


//export default Personal;
export default connect(mapStateToProps, mapDispatchToProps)(Personal);