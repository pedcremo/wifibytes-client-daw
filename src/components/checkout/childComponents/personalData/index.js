/** @module ComponentsApp */
import React from 'react';
import UserChoice from "./userChoice"
import PersonalDataForm from "./personalDataForm";
import SignIn from "../../../login/signIn";
import PortabilidadForm from "./portabilidadForm";
import { connect } from "react-redux";

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

    /* para carrito
    componentDidMount() {
        this.props.dispatch(getItems());
    } */
    
   
    render() {
        return (
            <div>

                <PersonalDataForm tipCliente={mockClientes}/>
                
            </div>
        );
    }
}


const mapStateToProps = state => ({    
    validForms: state.personalDataForm.validForms,
    loaded: state.personalDataForm.loaded,
});


export default connect(mapStateToProps)(Personal);