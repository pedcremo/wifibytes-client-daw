/** @module ComponentsApp */
import React from 'react';
import {Utils} from "../utils";
import RateBoxSubComponent from './rateBoxSubcomponent';
import VegasCarousel from './vegasCarousel';
class Home extends React.Component {
    /**
     * @constructor
     * @param {json} homeJSON
     * @param {string} selectRule
     */
    constructor(props) {
        super(props);
        this.state={
            homeJSON:[], //Prefiltered by get util method
            ratesJSON:[],
            isLoading:true
        };
    }

    componentDidMount(){
        let that=this;
        Promise.all([ Utils.get("/tarifa/?destacado=true"), Utils.get("/home",[ Utils.filterPruneArrayByLang,"lang"])]).then(function(results) {
            that.setState({
                homeJSON: results[1][0],
                ratesJSON: results[0],
                isLoading: false
            });
        });
    }
    /** render: Array with two JSONs first element tarifa?destacado=true endpoint and second home endpoint */
    render() {
        console.log(this.state);
        const isLoading = this.state.isLoading;
        return (
            <div>
                {isLoading ? (
                    <h1>Loading...</h1>
                ) : (
                <div>
                    <div className="p-5">
                        <h1 id="title" className="glow text-center pb-5">{this.state.homeJSON.subtitulo}</h1>

                            <RateBoxSubComponent rates={this.state.ratesJSON.results} />

                        
                            <VegasCarousel />
                        
                    </div>
                    <div className="row p-5 bg-white">
                        <div className="col-md-6 mt-md-0 mt-3" >
                            <h1 className="text-uppercase">{this.state.homeJSON.caja_izquierda_titulo}</h1>
                            <div id="left_box" dangerouslySetInnerHTML={{__html: this.state.homeJSON.caja_izquierda_texto}}></div>
                        </div>
                        <div className="col-md-6 mt-md-0 mt-3" >
                            <h1 className="text-uppercase">{this.state.homeJSON.caja_derecha_titulo}</h1>
                            <div dangerouslySetInnerHTML={{__html: this.state.homeJSON.caja_derecha_texto}}></div>
                        </div>
                    </div>
                </div>
            )}
            </div>
        );
    }
}

export default Home;
