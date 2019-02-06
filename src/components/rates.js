import React from 'react';
import { connect } from "react-redux";
import {Utils} from "../utils";
import RateBoxSubComponent from "./rateBoxSubcomponent";
import VegasCarousel from './vegasCarousel';
import { getDatosEmpresa } from "../actions/datosEmpresaActions";
import { getRates } from "../actions/datosRatesActions";

/**
 * Draw active rates
 */
class Rates extends React.Component {    
    
    constructor() {
        super()
        this.state = {
            rates: [],
            ratesDescription: []
        };
    }

    componentWillMount() {
        this.props.dispatch(getRates());
        this.props.dispatch(getDatosEmpresa());
    } 

    componentWillReceiveProps(newProps) {
        this.setState({
            rates: newProps.tarifas,
            ratesDescription: newProps.cajitas
        });
    }

    handleFamilyPicker(event){
        console.warn(event.target.id)
        let tipo_tarifa = event.target.value
        //1 Movil, 2 Fijo,3 Fibra, 4 wifi, 5 TV
        if (tipo_tarifa>0){
            let filteredRates= this.props.tarifas.filter((item)=>{
                let subs=item.subtarifas.filter((subItem) => {
                    if (subItem.tipo_tarifa==tipo_tarifa) return subItem;
                });
                if (subs.length>0) return item;
            });
            this.setState({
                rates:filteredRates,
                ratesDescription:this.props.cajitas
            }); 
        }else {
            this.setState({  
                rates: this.props.tarifas,
                ratesDescription: this.props.cajitas
            });
        }
        for (const iterator of document.getElementsByClassName("nav-item nav-link"))
            $(`#${iterator.id}`).removeClass("active");
        
        $(`#${event.target.id}`).addClass("active");
    }
   
    render() {
        const { error, datosEmpresa } = this.props;
        const { ratesDescription, rates }= this.state;

        
        if (error) return (<div>Error! </div>);

        if (Object.keys(datosEmpresa).length > 0 && ratesDescription && ratesDescription.length > 0 && rates.length > 0) {
            /* console.warn("this.state", this.state) */
            console.log("RATES",rates)
            let boxTextsArray = [];
            for (let [key, value] of Object.entries(ratesDescription[0])) {            
                if (key.startsWith("caja")) {
                    let groups=key.match(/caja_([\d]*)_([\w]*)/)
                    if (!boxTextsArray[groups[1]]) boxTextsArray[groups[1]]={};                
                    boxTextsArray[groups[1]][groups[2]]=value;
                }
            }
            //Filter empty element and construct cards with rates additional information
            boxTextsArray = boxTextsArray.filter((item)=>{
                return (item!=null || item!=undefined);
            }).map((item) => {
                return (
                    <div className="card" key={item.titulo}>
                        <div className="card-header">
                            <img src={item.icono} />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title font-weight-bold text-uppercase" dangerouslySetInnerHTML={{__html: item.titulo}}></h5>
                            <p className="card-text" dangerouslySetInnerHTML={{__html: item.texto}}></p>
                        </div>
                    </div>);
            });
                
            return (
                <div className="p-5">
                    <h1 className="glow text-center pt-1">{this.state.ratesDescription[0].pretitulo}</h1>
                    <h1 className="glow text-center pt-1">{this.state.ratesDescription[0].titulo}</h1>
                    
                    <nav className="nav nav-pills nav-justified">
                        <button onClick={(e) => this.handleFamilyPicker(e)} id="btn-All" value="0" className="active nav-item  nav-link">TOTES</button>
                        <button onClick={(e) => this.handleFamilyPicker(e)} id="btn-fibra" value="3" className="nav-item nav-link"><i className="fas fa-filter"></i>Fibra óptica</button>
                        <button onClick={(e) => this.handleFamilyPicker(e)} id="btn-movil" value="1" className="nav-item nav-link"><i className="fas fa-filter"></i>Móvil</button>
                        <button onClick={(e) => this.handleFamilyPicker(e)} id="btn-wifi" value="4" className="nav-item nav-link"><i className="fas fa-filter"></i>Wifi diseminado</button>
                    </nav> 
                    <VegasCarousel vegas={datosEmpresa} />
                    <RateBoxSubComponent rates={this.state.rates}></RateBoxSubComponent>
                    
                    <div className="card-deck mt-2 mb-5">
                        {boxTextsArray}
                    </div>
                </div> 
            )


        }else  
            return (<div>Loading...</div>)
        
    }
}

const mapStateToProps = state => ({
    tarifas: state.datosRates.items,
    cajitas: state.datosRates.items2,
    loading: state.datosRates.loading,
    datosEmpresa: state.datosEmpresa.items,
    error: state.datosRates.error
});
export default connect(mapStateToProps)(Rates);


 //  handleFamilyPicker(event) {
 //      console.error(event)
 //      /*  let tipo_tarifa = event.target.value
 //       //1 Movil, 2 Fijo,3 Fibra, 4 wifi, 5 TV
 //       if (tipo_tarifa>0){
 //           let filteredRates= this.state.originalRates.filter((item)=>{
 //               let subs=item.subtarifas.filter((subItem) => {
 //                   if (subItem.tipo_tarifa==tipo_tarifa) return subItem;
 //               });
 //               if (subs.length>0) return item;
 //           });     
 //           this.setState({
 //               rates:filteredRates,
 //               ratesDescription:this.state.originalRatesDescription
 //           }); 
 //       }else {
 //           this.setState({  
 //               rates:this.state.originalRates,
 //               ratesDescription:this.state.originalRatesDescription
 //           });
 //       } */
 //      //$("button.nav-item").find("button.active").removeClass("active");
 //      // $("#"+event.target.id ).addClass("active");
 //  }
