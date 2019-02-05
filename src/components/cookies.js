
/** @module ComponentsApp */
import React from 'react';
import {Utils} from "../utils";
import { connect } from "react-redux";
import { getDatosEmpresa } from "../actions/datosEmpresaActions";

/**
 * @class
 * Draw cookies text information
 */
class Cookies extends React.Component {

    componentDidMount(){
        this.props.dispatch(getDatosEmpresa());
    }

    /** render  */
    render() {
        /* const isLoading = this.state.isLoading; */
        const { error, loading, datosEmpresa } = this.props;
        
        if (error) 
            return (<div>Error! </div>);
        
        if (loading) 
            return (<div>Loading...</div>);
        
        if(datosEmpresa){
            let cookiesTexts;
            if (Object.keys(datosEmpresa).length > 0) {
                cookiesTexts = datosEmpresa.textos.filter((itemText) => {
                    return itemText.key.match(/cookies/i) && itemText.lang == Utils.getUserLang();
                }).map((item) => {
                    return item.content;
                });
            }
            
            return (
                <div className="p-5" dangerouslySetInnerHTML={{__html: cookiesTexts}}></div>
            );
        }
                 
    }
}

const mapStateToProps = state => ({
    datosEmpresa: state.datosEmpresa.items,
    loading: state.datosEmpresa.loading,
    error: state.datosEmpresa.error
});

export default connect(mapStateToProps)(Cookies);

