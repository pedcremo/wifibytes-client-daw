
/** @module ComponentsApp */
import React from 'react';
import { Utils } from "../../utils";
import { connect } from "react-redux";
import { getDatosFamilies} from "../../actions/datosFamiliesActions";
/**
 * @class
 * Draw families on catalog
 */
class Families extends React.Component {

    componentDidMount() {
        this.props.dispatch(getDatosFamilies());
    }
    /** render */
    render() {
        const { error, loading, datosFamilies } = this.props;
        
        if (error) {
            return (<div>Error!</div>);
        }
        if (loading) {
            return (<div>Loading...</div>);
        }
        if(datosFamilies){
            if (datosFamilies.length > 0) {
                console.log(datosFamilies);
                var currentFamily = datosFamilies.results[0];
                var currentFamilyFilter = [datosFamilies.results[0]];
                let family = datosFamilies.results;
                currentFamilyFilter.filter((itemText) => {
                    let cabecera = itemText.texto_cabecera.replace(/^\<p>+|\<\/p>+$/g, '');
                    text.push(cabecera);
                    let subCabecera = itemText.subtexto_cabecera.replace(/^\<p>+|\<\/p>+$/g, '');
                    subtexto.push(subCabecera);
                });
                return (
                    <div>
                        <div className="families pt-4 pb-4 pr-0 pl-0 m-0 text-white" style={{ background: currentFamily.color.hexadecimal }}>
                            <img className="float-left" src={currentFamily.imagen_cabecera} />
                            <h3>{currentFamily.pretitulo}</h3>
                            <h1 className="display-1">{currentFamily.titulo}</h1><br /><br />
                            <h3 className="families-text">{text.join("")}</h3>
                            <h1 className="display-3">{currentFamily.precio_cabecera} € IVA Inc.</h1>
                            <h3>{subtexto.join("")}</h3>
                        </div>
                        <div className="grid row">
                            <div className="col">
                                <h1 className="text-center">{Utils.translate("catalog-our-articles")}</h1>
                                <h2 className="text-center">{Utils.translate("catalog-change-family")}</h2>
                            </div>
                        </div>
                        <ul className="nav-families nav nav-pills mb-3" id="pills-tab" role="tablist">
                        
                            {family.map((itemFamily, index) => {
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
            } else {
                console.log(datosFamilies);
                return("");
            }
        }
    }
}
const mapStateToProps = state => ({
    datosFamilies: state.datosFamilies.items,
    loading: state.datosEmpresa.loading,
    error: state.datosEmpresa.error
});

export default connect(mapStateToProps)(Families);
