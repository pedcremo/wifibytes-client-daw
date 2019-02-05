
/** @module ComponentsApp */
import React from 'react';
import { connect } from "react-redux";
import SignPad from './signaturePad';
import { Utils } from "../../../../utils";
import { sendContractsAction, getDatosContracts } from "../../../../actions/datosContractsAction";
//import { getContactDataForm } from "../actions/personalDataFormActions";


/**
 * @class
 * Read and accept the terms and conditions text information
 */
class Contracts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                sign: "",
                pos: "",
                time: ""
            },
            showModal: false,
            next: false
        };
        this.reciveSign = this.reciveSign.bind(this);
        this.sendContract = this.sendContract.bind(this);
        this.stateModal = this.stateModal.bind(this);
    }

    componentDidMount(){
        this.props.dispatch(getDatosContracts());
        fetch('http://ip-api.com/json')
        .then(response => console.log(response.json()))
        .then(json => console.log(json))
        .catch(error => console.log((error, null)))
        //this.props.dispatch(getContactDataForm());
    }

    /** Change the state to show or hide the modal of signing*/
    stateModal(state) {
        this.setState({ showModal: state });
    }

    /**Recive sign from the child */
    reciveSign(sign) {
        this.getPosition().then( pos => {
            this.setState({
                showModal: false,
                next: true,
                data: {
                    ...this.state.data,
                        sign: sign,
                        pos: "Position: lat: "+ pos.coords.latitude +" long: "+ pos.coords.longitude,
                        time: 'Hour: ' + new Date()
                }
            }); 
        });
        //navigator.geolocation ? navigator.geolocation.getCurrentPosition(this.success) : '';
    }

    sendContract(html){
        this.props.dispatch(sendContractsAction(html));
    }


    getPosition() {
        return new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition(res, rej);
        });
    };

    /** render  */
    render() {
        console.log(this.state.data);
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
            let servicios1 = [ 1, 2, 3 ];
            let servicios2 = [ 1, 2 ];
            let servicios3 = [ 1 ];

            let re = new RegExp("("+servicios1.join('|')+"|autorizacion)","i");
            const datosTexts = datosContracts.filter((itemText) => {
                return itemText.key.match(re);
            }).reverse().map((item) => {
                return item.title+" "+item.content;
            });

            let contractsHTML = eval('`' + datosTexts.join(' ') + '`');
            return (
                <div className="d-flex justify-content-center">
                    {
                        !this.state.next? 
                            <p className="text-danger">*The contracts need to be signed</p>
                        :
                            ''
                    }
                    <div widh="60%" className="m-5 p-5 border border-ligth shadow rounded d-flex flex-direction-center">
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modalContracts">
                            See Contracts
                        </button>
                    </div>
                    <div className="modal fade" id="modalContracts" tabIndex="-1" role="dialog" aria-labelledby="modalContracts" aria-hidden="true">
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
                                    { 
                                        !this.state.next?
                                            <button type="button" className="btn btn-primary" data-toggle="modal" onClick={() => this.stateModal(true)}>Accept and Sign</button>
                                        :
                                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.nextStep}>Next</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                        this.state.showModal ?
                            <div id="myModal" className="modal_manual modal_manual_con">
                                <div className="modal_content_manual modal_content_manual_con">
                                    <div className="modal-header mb-4">
                                        <h5 className="modal-title" id="exampleModalLong">Firmar Contratos</h5>
                                        <button type="button" className="close" aria-label="Close" onClick={() => this.stateModal(false)}>
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <SignPad onReciveSign={this.reciveSign} /> 
                                </div>
                            </div>
                        :   ''
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

