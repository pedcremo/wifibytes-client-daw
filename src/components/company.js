/** @module ComponentsApp */


import React from 'react';
import {Utils} from "../utils";
import { connect } from "react-redux";
import { getDatosEmpresa } from "../actions/datosEmpresaActions";
/**
 * @class
 * Draw company information
 */
class Company extends React.Component {
    
    componentDidMount(){
        this.props.dispatch(getDatosEmpresa());
    }
    
    /** render  */
    render() {       
        const { error, loading, datosEmpresa } = this.props;
        
        if (error) 
            return (<div>Error! </div>);
        
        if (loading) 
            return (<div>Loading...</div>);
        
        if(datosEmpresa){
            let companyTexts;
            if (Object.keys(datosEmpresa).length > 0) {
                companyTexts = datosEmpresa.textos.filter((itemText) => {
                    return itemText.key.match(/sobre/i) && itemText.lang == Utils.getUserLang();
                }).map((item) => {
                    return item.content;
                });
            }
            return (
                <div>
                    <div className="p-5" dangerouslySetInnerHTML={{__html: companyTexts}}>                  
                    </div>
                </div>
                
            );    
        }
              
    }
}

const mapStateToProps = state => ({
    datosEmpresa: state.datosEmpresa.items,
    loading: state.datosEmpresa.loading,
    error: state.datosEmpresa.error
});

export default connect(mapStateToProps)(Company);