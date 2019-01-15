
/** @module ComponentsApp */
import React from 'react';
import {Utils} from "../utils";
import { connect } from "react-redux";
import { getDatosEmpresa } from "../actions/datosEmpresaActions";

/**
 * @class
 * Draw Contracts text information
 */
class Contracts extends React.Component {

    componentDidMount(){
        this.props.dispatch(getDatosEmpresa());
    }

    /** render  */
    render() {
        return(
            <div>
                <h1>Contracts</h1>
            </div>);
    }
}

const mapStateToProps = state => ({
    datosEmpresa: state.datosEmpresa.items,
    loading: state.datosEmpresa.loading,
    error: state.datosEmpresa.error
});

export default connect(mapStateToProps)(Contracts);

