
/** @module ComponentsApp */
import React from 'react';
import { connect } from "react-redux";
import SignPad from './signaturePad';
import { sendContractsAction, getDatosContracts } from "../actions/datosContractsAction";
//import { getContactDataForm } from "../actions/personalDataFormActions";


/**
 * @class
 * Read and accept the terms and conditions text information
 */
class Contracts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          showComponent: false,
          sign: "",
          next: false
        };
        this._onButtonClick = this._onButtonClick.bind(this);
        this.reciveSign = this.reciveSign.bind(this);
        this.sendContract = this.sendContract.bind(this);
    }

    componentDidMount(){
        this.props.dispatch(getDatosContracts());
        //this.props.dispatch(getContactDataForm());
    }

    /**Accept terms and conditions before sign the contracts  */
    _onButtonClick() {
        this.setState({ showComponent: true });
    }

    /**Recive sign from the child */
    reciveSign(sign) {
        this.setState({ 
            sign: sign,
            next: true
        });
    }

    sendContract(html){
        this.props.dispatch(sendContractsAction(html));
    }

    /** render  */
    render() {
        const { error, loading, datosContracts} = this.props;

        if (error) return (<div>Error Home! </div>);
        if (loading) return (<div>Loading Home ...</div>);

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
        if(datosContracts.length > 0){
            let servicios1 = ['fibra','movil','tv'];
            let servicios2 = ['fibra','movil'];
            let servicios3 = ['fibra'];

            let re = new RegExp("("+servicios3.join('|')+"|autorizacion)","i");
            const datosTexts = datosContracts.filter((itemText) => {
                return itemText.key.match(re);
            }).map((item) => {
                return item.title+" "+item.content;
            });

            let contractsHTML = eval('`' + datosTexts.join(' ') + '`');
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
                                    <p dangerouslySetInnerHTML={{ __html: contractsHTML}}></p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this._onButtonClick}>Acept</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        this.state.showComponent?
                            <SignPad onReciveSign={this.reciveSign} /> 
                        :
                            null
                    }
                    {
                        this.state.next?
                            <button onClick={ () => this.sendContract(contractsHTML) }>Send</button>
                        :
                            null
                    }
                </div>
    
            );
        }else{
            return(
                <span>LOADING!</span>
            );
        }

    }
}

const mapStateToProps = state => ({
    datosContracts: state.datosContracts.items,
});

export default connect(mapStateToProps)(Contracts);

