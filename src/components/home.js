/** @module ComponentsApp */
import React from 'react';
import { connect } from "react-redux";
import RateBoxSubComponent from './rateBoxSubcomponent';
import VegasCarousel from './vegasCarousel';
import { getDatosTarifas } from "../actions/datosTarifasActions";
import { getDatosHome } from "../actions/datosHomeActions";
import { getDatosEmpresa } from "../actions/datosEmpresaActions";

class Home extends React.Component {

    componentDidMount() {
        this.props.dispatch(getDatosTarifas());
        this.props.dispatch(getDatosHome());
        this.props.dispatch(getDatosEmpresa());
        console.log(this.props);
    }
    /** render: Array with two JSONs first element tarifa?destacado=true endpoint and second home endpoint */
    render() {
        const { error, loading, datosHome, datosTarifa, datosEmpresa} = this.props;
        if (error) return (<div>Error Home! </div>);

        if (loading) return (<div>Loading Home ...</div>);
        try{
            if (datosHome.length > 0 && datosTarifa.results.length > 0 && datosEmpresa) {
                return (
                    <div>
                        <div>
                            <div className="p-5">
                                <span key="0">
                                    <h1 id="title" className="glow text-center pb-5" key="0">{datosHome[0].subtitulo}</h1>
                                    <RateBoxSubComponent key={"rateBox"} rates={datosTarifa.results} />
                                </span>
                                <VegasCarousel vegas={datosEmpresa} />
                            </div>

                            <div className="row p-5 bg-white">
                                <div className="col-md-6 mt-md-0 mt-3" >
                                    <span key="0">
                                        <h1 className="text-uppercase" key={datosHome[0].pk}>{datosHome[0].caja_izquierda_titulo}</h1>
                                        <div id="left_box" key="0" dangerouslySetInnerHTML={{ __html: datosHome[0].caja_izquierda_texto }}></div>
                                    </span>
                                </div>

                                <div className="col-md-6 mt-md-0 mt-3" >
                                    <span key="0">
                                        <h1 className="text-uppercase" key={datosHome[0].pk}>{datosHome[0].caja_derecha_titulo}</h1>
                                        <div key="0" dangerouslySetInnerHTML={{ __html: datosHome[0].caja_derecha_texto }}></div>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            } else {
                return(
                <span>LOADING!</span>
                );
            }
        }catch{
            return(
                <span>LOADING!</span>
                );
        }

    }
}

const mapStateToProps = state => {

    return {
        datosHome: state.datosHome.items,
        datosTarifa: state.datosTarifa.items,
        datosEmpresa: state.datosEmpresa.items,
        loading: state.datosEmpresa.loading,
        error: state.datosEmpresa.error
    }
};

//export default Home;
export default connect(mapStateToProps)(Home);
