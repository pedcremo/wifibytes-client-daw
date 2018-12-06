
/** @module ComponentsApp */
import React from 'react';
import { Utils } from "../../utils";

/**
 * @class
 * Draw cookies text information
 */
class Families extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            families: [],
            currentFamily: [],
            isLoading: true
        }
    }
    componentDidMount() {
        let that = this;
        Utils.get('/familia').then(function (response) {
            let currentFamily = response.results[0];
            let familia = response.results;

            that.setState({
                families: familia,
                currentFamily: currentFamily,
                isLoading: false
            });
        }).catch(function (error) {
            console.log("Failed!", error);
        });

    }
    /** render  */
    render() {
        const isLoading = this.state.isLoading;
        return (
            <div>
                <div className="pt-4 pb-4 pr-0 pl-0 m-0 text-white" style={{ background: "#C7BB15" }}>
                    <img className="float-left" src={this.state.currentFamily.imagen_cabecera} />
                    <h3>{this.state.currentFamily.pretitulo}</h3>
                    <h1 className="display-1">{this.state.currentFamily.titulo}</h1><br /><br />
                    <h3>{this.state.currentFamily.texto_cabecera}</h3>
                    <h1 className="display-3">{this.state.currentFamily.precio_cabecera} € IVA Inc.</h1>
                    <h3>{this.state.currentFamily.subtexto_cabecera}</h3>
                </div>
                <div className="grid row">
                    <div className="col">
                        <h1 className="text-center">{Utils.translate("catalog-our-articles")}</h1>
                        <h2 className="text-center">{Utils.translate("catalog-change-family")}</h2>
                    </div>
                </div>
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    {this.state.families.map((itemFamily, index) => {
                        return (
                            isLoading ? (
                                <h1>Loading families...</h1>
                            ) : (
                                    <li className="nav-item">
                                        <a id="change-family" className='nav-link {index==0?"active":""}' data-toggle="pill" href={'#catalog/' + itemFamily.codfamilia}><img width="32px" height="32px" src={itemFamily.icono} />{itemFamily.nombre}</a>
                                    </li>
                                ));
                    })}

                </ul>

            </div>

        );
    }
}

export default Families; 
