
/** @module ComponentsApp */
import React from 'react';
import { Utils } from "../../utils";

/**
 * @class
 * Draw families on catalog
 */
class Families extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            families: [],
            currentFamily: [],
            text: [],
            color: [],
            subtexto: [],
            isLoading: true
        }
    }
    componentDidMount() {
        let that = this;
        let text = [], subtexto = [];
        Utils.get('/familia').then(function (response) {
            var currentFamily = response.results[0];
            var currentFamilyFilter = [response.results[0]];
            let family = response.results;
            currentFamilyFilter.filter((itemText) => {
                let cabecera = itemText.texto_cabecera.replace(/^\<p>+|\<\/p>+$/g, '');
                text.push(cabecera);
                let subCabecera = itemText.subtexto_cabecera.replace(/^\<p>+|\<\/p>+$/g, '');
                subtexto.push(subCabecera);
            });

            that.setState({
                families: family,
                currentFamily: currentFamily,
                text: text.join(""),
                subtexto: subtexto.join(""),
                color: currentFamily.color.hexadecimal,
                isLoading: false
            });
        }).catch(function (error) {
            console.log("Failed!", error);
        });
        
    }
    /** render */
    render() {
        const isLoading = this.state.isLoading;
        return (
            <div>
                <div className="families pt-4 pb-4 pr-0 pl-0 m-0 text-white" style={{ background: this.state.color }}>
                    <img className="float-left" src={this.state.currentFamily.imagen_cabecera} />
                    <h3>{this.state.currentFamily.pretitulo}</h3>
                    <h1 className="display-1">{this.state.currentFamily.titulo}</h1><br /><br />
                    <h3 className="families-text">{this.state.text}</h3>
                    <h1 className="display-3">{this.state.currentFamily.precio_cabecera} € IVA Inc.</h1>
                    <h3>{this.state.subtexto}</h3>
                </div>
                <div className="grid row">
                    <div className="col">
                        <h1 className="text-center">{Utils.translate("catalog-our-articles")}</h1>
                        <h2 className="text-center">{Utils.translate("catalog-change-family")}</h2>
                    </div>
                </div>
                <ul className="nav-families nav nav-pills mb-3" id="pills-tab" role="tablist">
                
                    {this.state.families.map((itemFamily, index) => {
                        return (
                            isLoading ? (
                                <h1>Loading families...</h1>
                            ) : (
                                    <li className="nav-item" key={itemFamily.codfamilia}>
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
