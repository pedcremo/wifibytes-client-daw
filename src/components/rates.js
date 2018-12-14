import React from 'react';
import {Utils} from "../utils";

import RateBoxSubComponent from "./rateBoxSubcomponent";
/**
 * Draw active rates
 */
class Rates extends React.Component {
    /**
     * @constructor
     * @param {json} activeRatesJSON 
     * @param {string} selectRule 
     */
    constructor(props) {
        super(props);
        this.state = {
            rates : [],
            originalRates : [],
            ratesDescription : [],
            originalRatesDescription : [],
            isLoading:true
        };
        this.handleFamilyPicker = this.handleFamilyPicker.bind(this);
        $("#btn-All" ).addClass("active");
    }

    componentDidMount(){
        let that = this;
        Promise.all([ Utils.get("/tarifa/?activo=true"),  Utils.get("/tarifa_descriptor")]).then(function(results) {
            that.setState({
                rates : results[0].results,
                ratesDescription : results[1][0],
                originalRates : results[0].results,
                originalRatesDescription : results[1][0],
                isLoading:false
            })
          }).catch(function(error) {
            console.log("Failed!", error);
        });
    }
    handleFamilyPicker(event){
        let tipo_tarifa = event.target.value
        //1 Movil, 2 Fijo,3 Fibra, 4 wifi, 5 TV
        if (tipo_tarifa>0){
            let filteredRates= this.state.originalRates.filter((item)=>{
                let subs=item.subtarifas.filter((subItem) => {
                    if (subItem.tipo_tarifa==tipo_tarifa) return subItem;
                });
                if (subs.length>0) return item;
            });     
            this.setState({
                rates:filteredRates,
                ratesDescription:this.state.originalRatesDescription
            }); 
        }else {
            this.setState({  
                rates:this.state.originalRates,
                ratesDescription:this.state.originalRatesDescription
            });
        }
        //$("button.nav-item").find("button.active").removeClass("active");
        // $("#"+event.target.id ).addClass("active");
    }
    render() {
        let boxTextsArray = [];
        for (let [key, value] of Object.entries(this.state.ratesDescription)) {            
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
                        <h5 className="card-title font-weight-bold text-uppercase"> {item.titulo}</h5>
                        <p className="card-text">{item.texto}</p>
                    </div>
                </div>);
        });
        return (
            <div>
                {this.state.isLoading ? (
                <h1>Loading...</h1>
                ) : (
                    <div className="p-5">
                    <h1 className="glow text-center pt-1">{this.state.ratesDescription.pretitulo}</h1>
                    <h1 className="glow text-center pt-1">{this.state.ratesDescription.titulo}</h1>
                    
                    <nav className="nav nav-pills nav-justified">
                        <button onClick={(e) => this.handleFamilyPicker(e)} id="btn-All" value="0" className="nav-item  nav-link">TOTES</button>
                        <button onClick={(e) => this.handleFamilyPicker(e)} id="btn-fibra" value="3" className="nav-item nav-link"><i className="fas fa-filter"></i>Fibra óptica</button>
                        <button onClick={(e) => this.handleFamilyPicker(e)} id="btn-movil" value="1" className="nav-item nav-link"><i className="fas fa-filter"></i>Móvil</button>
                        <button onClick={(e) => this.handleFamilyPicker(e)} id="btn-wifi" value="4" className="nav-item nav-link"><i className="fas fa-filter"></i>Wifi diseminado</button>
                    </nav> 

                    <div>
                        <RateBoxSubComponent rates={this.state.rates}></RateBoxSubComponent>
                    </div>
                    <div className="card-deck mt-2 mb-5">
                        {boxTextsArray}
                    </div>
                </div>
                )}
            </div>
        );
    }
}
export default Rates;
