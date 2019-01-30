/** @module ComponentsApp */
import React from 'react';
import Articles from "./articles";
import Families from "../catalog/families";
import Filters from "./filters";
import { connect } from "react-redux";
import { getDatosArticulos } from "../../actions/datosArticulosActions";
/**
 * @class
 * Draw article catalog that could be filtered by article family
 */
class Catalog extends React.Component {

    componentDidMount() {
        this.props.dispatch(getDatosArticulos());
    }
    /** render  */
    render() {
        const { error, loading, datosArticulos } = this.props;
        
        if (error) {
            return (<div>Error! {error.message}</div>);
        }
    
        if (loading) {
            return (<div>Loading...</div>);
        }
        if(datosArticulos){
            if (datosArticulos.length > 0) {
                return (
                    <span className="catalog">
                        <Families familia={datosArticulos[0]} />
                        <Filters filters={datosArticulos[1]} />
                        <Articles articles={datosArticulos[2].results} />
                    </span>
                );
            } else {
                return("");
            }
        }
    }
}

const mapStateToProps = state => ({
    datosArticulos: state.datosArticulos.items,
    loading: state.datosArticulos.loading,
    error: state.datosArticulos.error
});

export default connect(mapStateToProps)(Catalog);
