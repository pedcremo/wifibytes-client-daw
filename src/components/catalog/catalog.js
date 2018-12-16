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
        console.log(datosArticulos);
        if (error) {
            return (<div>Error! {error.message}</div>);
        }
    
        if (loading) {
            return (<div>Loading...</div>);
        }
        return (
            <span className="catalog">
                <Families />
                <Filters filters={datosArticulos[0]} />
                <Articles articles={datosArticulos[1]} />
            </span>
        );

    }
}

const mapStateToProps = state => ({
    datosArticulos: state.datosArticulos.items,
    loading: state.datosArticulos.loading,
    error: state.datosArticulos.error
});

export default connect(mapStateToProps)(Catalog);
