/** @module ComponentsApp */
import React from 'react';
import {Utils} from "../utils";

class RateDetail extends React.Component {
    constructor(props){
        super(props);
        this.state={
            idRate: props.idRate,
            tarifaJSON:[],
            isLoading:true
        }
    }
    componentDidMount() {
        let that=this;
        Promise.all([ Utils.get("/tarifa/"+this.state.idRate),  Utils.get("/tarifa_descriptor")]).then(function(results) {
            that.setState({
                tarifaJSON: results,
                isLoading:false
            });
        }).catch(function(error) {
        });
    }

 
    /** render  */
    render() {
        const isLoading = this.state.isLoading;
        return (<div>
                {isLoading ? (
                    <h1>Loading...</h1>
                ) : (
                    <section id="tarifa" >            
                        <div className="header-tarifa" style={{background: this.state.tarifaJSON[0].color.hexadecimal}}>
                            <div className="row text-white text-center">
                                <div className="col-md-12 no-padding p-5">
                                    <h2 className="pretitulo" >{this.state.tarifaJSON[0].pretitulo }</h2>
                                    <h1 className="display-4" >{this.state.tarifaJSON[0].nombretarifa } <span className="text-dark" >{this.state.tarifaJSON[0].precio }{Utils.translate('home-euros-month') }</span></h1>
                                </div>
                            </div>
                        </div>
                        <table className="tableRateDetails">
                            <thead>
                                <tr>
                                    <td>
                                        <img src={this.state.tarifaJSON[1][1].caja_1_icono} />
                                    </td>
                                    <td>
                                        <img src={this.state.tarifaJSON[1][1].caja_2_icono} />
                                    </td>
                                    <td>
                                        <img src={this.state.tarifaJSON[1][1].caja_3_icono} />
                                    </td>
                                    <td>
                                        <img src={this.state.tarifaJSON[1][1].caja_4_icono} />
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <h3 dangerouslySetInnerHTML={{__html: this.state.tarifaJSON[1][1].caja_1_titulo}}></h3>
                                        <p dangerouslySetInnerHTML={{__html: this.state.tarifaJSON[1][1].caja_1_texto}}></p>
                                    </td>
                                    <td>
                                        <h3 dangerouslySetInnerHTML={{__html: this.state.tarifaJSON[1][1].caja_2_titulo}}></h3>
                                        <p dangerouslySetInnerHTML={{__html: this.state.tarifaJSON[1][1].caja_2_texto}}></p>  
                                    </td>
                                    <td>
                                        <h3 dangerouslySetInnerHTML={{__html: this.state.tarifaJSON[1][1].caja_3_titulo}}></h3>
                                        <p dangerouslySetInnerHTML={{__html: this.state.tarifaJSON[1][1].caja_3_texto}}></p>
                                    </td>
                                    <td>
                                        <h3 dangerouslySetInnerHTML={{__html: this.state.tarifaJSON[1][1].caja_4_titulo}}></h3>
                                        <p dangerouslySetInnerHTML={{__html: this.state.tarifaJSON[1][1].caja_4_texto}}></p>  
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                )}
                </div>);
    }
}
export default RateDetail;

