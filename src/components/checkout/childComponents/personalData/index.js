/** @module ComponentsApp */
import React from 'react';
// import {AuthService} from "../../../../auth.service";
import UserChoice from "./userChoice"
import PersonalDataForm from "./personalDataForm";
import SignIn from "../../../login/signIn";
import PortabilidadForm from "./portabilidadForm";
import { connect } from "react-redux";
import {AuthService} from '../../../../auth.service'
import {
    getContactDataForm,
    updateContactDataFormServices,
    updateDatosProductos,
    getValidaForms,
    setUncompleted,
    setCompleted,
    updateData
} from "../../../../actions/personalDataFormActions";
import {getItems} from "../../../cart/cartActions";

import {Agent} from '../../agent';
import subitems_library from "../../libraries/subitems_based_library.json";

let mockClientes={particular:0, autonomo: 5, empresa: 1, extranjero: 2}
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

    componentDidMount() {
        /* this.props.dispatch(getContactDataForm()); */
        this.props.dispatch(getItems());
    }
    
   
    render() {
        /**
         * Usiang Agent and subitems_library we get the quantity of mobiles and fix phone rates.
         */
        return (
            <div>

                <PersonalDataForm tipCliente={mockClientes}/>
                
            </div>
        );
    }
}


const mapStateToProps = state => ({    
    fields: state.personalDataForm.fields,    
    validForms: state.personalDataForm.validForms,
    loaded: state.personalDataForm.loaded,
    error: state.personalDataForm.error,
    cartItems: state.cartReducer.items
});


export default connect(mapStateToProps)(Personal);