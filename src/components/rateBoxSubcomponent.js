import React from 'react';
/* import Component from "./component"; */
import {Utils} from "../utils";
import {PropTypes} from 'prop-types'

/**
 * Draw rates boxes from an input json with rates information
 */
class RateBoxSubComponent extends React.Component {
    /**
     * @constructor
     * @param {json} ratesJSON 
     */
    constructor(props) {
        super(props);
    }
   

    /** render  */
    render() {
        //console.log("RATE",this.props.rates);
        const highlitedRates = this.props.rates.map((itemFiltered, index) => {
            //console.log(itemFiltered)
            const subtarifas = (itemFiltered.subtarifas.map((itemSubtarifa, i) => {
                //1 Movil, 2 Fijo,3 Fibra, 4 wifi, 5 TV
                     
                switch (itemSubtarifa.tipo_tarifa) {
                    case 1: //Movil
                        return <p key={i} className="card-text p-2 border-bottom border-secondary">
                                    <i className="fas fa-2x fa-mobile-alt" style={{color:itemFiltered.color.hexadecimal}}></i>
                                    <br/> {this.context.t("home-mobile")} {itemSubtarifa.subtarifa_minutos_gratis} {this.context.t("home-min-month")}
                                    <br/>{itemSubtarifa.subtarifa_datos_internet} {this.context.t("home-gb-month")} 
                                </p>;                        
                        //break;
                    case 2: //Fijo
                        return <p key={i} className="card-text p-2 border-bottom border-secondary">
                                    <i className="fas fa-2x fa-phone" style={{color:itemFiltered.color.hexadecimal}}></i>
                                    <br/> {this.context.t("home-land-phone")} 
                                </p>;
                        //break;
                    case 3: //Fibra
                        return <p key={i} className="card-text p-2 border-bottom border-secondary">
                                    <i className="fas fa-2x fa-globe" style={{color:itemFiltered.color.hexadecimal}}></i>
                                    <br/> {this.context.t("home-fiber-optics")} {itemSubtarifa.subtarifa_velocidad_conexion_subida} {this.context.t("home-mb-upload")}
                                    <br/> {itemSubtarifa.subtarifa_velocidad_conexion_bajada} {this.context.t("home-mb-download")}
                                </p>;
                        //break;
                    case 4: //Wifi
                        return <p key={i} className="card-text p-2 border-bottom border-secondary">
                                    <i className="fas fa-2x fa-wifi" style={{color:itemFiltered.color.hexadecimal}}></i>
                                    <br/>  {this.context.t("home-wireless")} {itemSubtarifa.subtarifa_velocidad_conexion_subida} {this.context.t("home-mb-upload")}
                                    <br/> {itemSubtarifa.subtarifa_velocidad_conexion_bajada} {this.context.t("home-mb-download")}
                                </p>;
                        //break;
                    default:  //TV
                        return <p key={i} className="card-text p-2 border-bottom border-secondary">
                                    <i className="fas fa-2x fa-tv" style={{color:itemFiltered.color.hexadecimal}}></i>
                                    <br/> {itemSubtarifa.subtarifa_num_canales} {this.context.t("home-free-channels")}
                                </p>;
                        //break;
                }

            }))//INNER MAP
            const textTarifa = Utils.getUserLang() == "va" ? itemFiltered["subtarifas"]["0"]["subtarifa_tarifa"]["pretitulo_va"] : itemFiltered["subtarifas"]["0"]["subtarifa_tarifa"]["pretitulo"];
            
            return (      
                    
                <div key={index} className={`card rounded border text-center border-dark text-center zoom-rates ${Utils.randomAnimation()} `} style={{backgroundColor:"rgba(255, 255, 255, 0.8)"}}>
                    <div className="card-header  bg-dark text-light font-weight-bold">
                        <h3>
                            <img width="32px" height="32px" src={itemFiltered["logo"]}/>&nbsp;{itemFiltered.nombretarifa.toUpperCase()}
                        </h3>
                    </div>
                    <div className="card-body p-0">
                        <h5 className="card-title text-white p-2 mr-0" style={{backgroundColor:itemFiltered.color.hexadecimal}}> 
                            <span className="display-4">{itemFiltered.precio.toLocaleString()} {this.context.t("home-euros-month")} </span> 
                            <br/>{this.context.t("home-vat-included")}
                        </h5>
                        <h5 className="card-text pr-2 pl-2 pb-4 border-bottom border-secondary"><br/>
                            {textTarifa}
                        </h5>     
                        {subtarifas}                
                    </div>
                    <div className="card-footer bg-light d-flex justify-content-around">
                        <a href={'#rate/' + itemFiltered.codtarifa} className="btn btn-primary">
                            <h4 className="mb-0">{Utils.translate("view-details")}</h4>
                        </a>
                        <a href="#" className="btn btn-secondary">
                            <h4 className="mb-0">{Utils.translate("to-contract")}</h4>
                        </a>
                    </div>
                </div>
            );
        });
        
        
        return (
            <div className="grid-container--fit">
                {highlitedRates}
            </div>
        );
    }
};

RateBoxSubComponent.contextTypes = {
    t: PropTypes.func.isRequired
}

export default RateBoxSubComponent; 

/* 
 */
