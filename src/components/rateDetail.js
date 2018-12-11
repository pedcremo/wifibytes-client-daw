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
          console.log("Failed!", error);
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
                                    <h1 className="display-4" >{this.state.tarifaJSON[0].nombretarifa } <span className="text-dark">{this.state.tarifaJSON[0].precio }{Utils.translate('home-euros-month') }</span></h1>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
                </div>);
    }
}
export default RateDetail;

