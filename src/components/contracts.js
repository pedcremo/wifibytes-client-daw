
/** @module ComponentsApp */
import React from 'react';
import { connect } from "react-redux";
import SignPad from './signaturePad';

/**
 * @class
 * Draw Contracts text information
 */
class Contracts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          showComponent: false,
        };
        this._onButtonClick = this._onButtonClick.bind(this);
    }

    _onButtonClick() {
        this.setState({ showComponent: true });
    }

    /** render  */
    render() {

        let pdf = '<p><strong>AUTORIZACION CUENTA BANCARIA PARA ADEUDOS</strong></p><p>D. ${person.name} con nº NIF ${person.NIF} y domicilio en C/ ${person.direccion}, de ${person.ciudad}. provincia de ${person.provincia}. declara subsistentes las facultades con las que interviene que en modo alguno le han sido revocadas, modificadas ni suspendidas y , en la calidad que actúa,</p> <p><strong>AUTORIZA</strong></p><p> a la empresa WIFIBYTES, S.L , provista de CIF B98137078 a que desde la fecha de la presente y con carácter indefinido en tanto continúen las relaciones comerciales entre la empresa y el cliente, a que gire en el número de cuenta bancaria especificada en la presente autorización, todos los recibos correspondientes a las facturas que se originen como consecuencia de conexión de internet establecida, según lo exigido por la Ley de Servicios de Pago 16/2009.</p><p><strong>DATOS DE CONFIRMACION DE LA ENTIDAD BANCARIA</strong></p><p>Nombre de la Entidad Bancaria:</p><p>Domicilio de la Entidad Bancaria:</p><p>Nº de cuenta:</p><p>Confirma mediante firma:</p><p>Fecha: El ${person.day} de ${person.month} de ${person.year} </p>';
        let person = {
            name: "Daniel Ortiz Garcia",
            NIF: "49264590Q",
            direccion: "Avenida Almaig",
            ciudad: "Ontinyent",
            provincia: "Valencia",
            day: new Date().getDay(),
            month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][new Date().getMonth()],
            year: new Date().getFullYear()
        }

        return (
            <div>
                <h1>Contracts</h1>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
                    Launch demo modal
                </button>
                <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLong" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLong">Firmar Contratos</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p dangerouslySetInnerHTML={{ __html: eval('`' + pdf + '`') }}></p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this._onButtonClick}>Acept</button>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.showComponent?
                        <SignPad /> 
                    :
                        null
                }
            </div>

        );

    }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(Contracts);

