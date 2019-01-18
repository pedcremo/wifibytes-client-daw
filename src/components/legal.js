import React from 'react';
import {Utils} from "../utils";
import { connect } from "react-redux";
import { getDatosEmpresa } from "../actions/datosEmpresaActions";

/**
 * Draw legal texts
 */
class Legal extends React.Component{

    componentDidMount(){
        this.props.dispatch(getDatosEmpresa());
    }
    /** render  */
    render() {
        const { error, loading, datosEmpresa } = this.props;
        if (error) {
            return (<div>Error! {error.message}</div>);
        }
    
        if (loading) {
            return (<div>Loading...</div>);
        }

        if(datosEmpresa){

            let legalTexts;
            if (Object.keys(datosEmpresa).length > 0) {
                legalTexts = datosEmpresa.textos.filter((itemText) => {
                    return itemText.key.match(/legal/i) && itemText.lang == Utils.getUserLang();
                }).map((item) => {
                    return item.content;
                });
            }
            return (
                <div className="p-5" dangerouslySetInnerHTML={{__html: legalTexts}}></div>
            );
        }
              
    }
}

const mapStateToProps = state => ({
    datosEmpresa: state.datosEmpresa.items,
    loading: state.datosEmpresa.loading,
    error: state.datosEmpresa.error
});

export default connect(mapStateToProps)(Legal);

//export default Legal; 
