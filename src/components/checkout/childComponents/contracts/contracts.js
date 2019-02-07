
/** @module ComponentsApp */
import React from 'react';
import { connect } from "react-redux";
import SignPad from './signaturePad';
import { getDatosContracts, updateData, setCompleted, setUncompleted } from "../../../../actions/datosContractsAction";
//import { getContactDataForm } from "../actions/personalDataFormActions";

/**
 * @class
 * Read and accept the terms and conditions text information
 */
class Contracts extends React.Component {

    constructor(props) {
        super(props);
        if(this.props.infoContracts) {
            if(this.props.infoContracts.subTarifasLength === this.subTarifas().length){
                this.state = this.props.infoContracts;
                this.props.dispatch(updateData("contracts", this.state));
            }else{
                this.state = {
                    data: {
                        sign: this.props.infoContracts.data.sign,
                        pos: this.props.infoContracts.data.pos,
                        time: this.props.infoContracts.data.time
                    },
                    showModal: this.props.infoContracts.showModal,
                    next: true,
                    contractsHTML: false,
                    subTarifasLength: this.subTarifas().length
                };
                this.props.dispatch(updateData("contracts", this.state));
            }
        }else {
            this.state = {
                data: {
                    sign: "",
                    pos: "",
                    time: ""
                },
                showModal: false,
                next: false,
                contractsHTML: "",
                subTarifasLength: 0
            };
        }

        this.reciveSign = this.reciveSign.bind(this);
        /* this.sendContract = this.sendContract.bind(this); */
        this.stateModal = this.stateModal.bind(this);
    }
    
    componentDidMount(){
        this.props.dispatch(getDatosContracts());
/*         fetch('http://ip-api.com/json')
        .then(response => console.log(response.json()))
        .then(json => console.log(json))
        .catch(error => console.log((error, null))) */
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
            
            this.mountContracts();
            this.props.dispatch(updateData("contracts", this.state));
            //////////////////// IS VALID ///////////////////////////
            this.props.dispatch(setCompleted());
        });
    }

    getPosition() {
        return new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition(res, rej);
        });
    };

    mountContracts() {
        //this.props.DataPersonal
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
        
        //this.props.Tarifes
        let subTarifasCon = this.subTarifas();

        let re = new RegExp("("+subTarifasCon.join('|')+"|autorizacion)","i");
        const datosTexts = this.props.datosContracts.filter((itemText) => {
            return itemText.key.match(re);
        }).reverse().map((item) => {
            return item.title+" "+item.content;
        });

        this.setState({ 
            contractsHTML: eval('`' + datosTexts.join(' ') + '`'),
            subTarifasLength: subTarifasCon.length 
        });
    }

    subTarifas(){
        let cartReducer = [];
        JSON.parse(localStorage.getItem('cartReducer'))
        .items.map(item => {return item.subtarifas ? item.subtarifas : []})
        .map(item => {return item.map(item => {
            if(cartReducer.indexOf(item.id) < 0)
                cartReducer.push(item.id);
        })});
        return cartReducer;
    }

    componentDidUpdate(){
        //////////////////// INVALID ////////////////////////////
        if(!this.state.next)
            this.props.dispatch(setUncompleted());
    }

    /** render  */
    render() {
        const { error, loading, datosContracts} = this.props;
        if (error) return (<div>Error Home! </div>);
        if (loading) return (<div>Loading Home ...</div>);
        
        if(datosContracts.length > 0 && true){
            if(!this.state.contractsHTML)
                this.mountContracts()

            return (
                <div className="d-flex flex-column align-items-center">
                    {
                        !this.state.next? 
                            <p className="mt-5 text-danger">*The contracts need to be signed</p>
                        :
                            ''
                    }
                    <div className="mb-5 ml-5 mr-5 mt-3 p-5 border border-ligth shadow rounded d-flex flex-direction-center">
                        <button type="button" className="btn btn-primary ml-5 mr-5" data-toggle="modal" data-target="#modalContracts">
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
                                    <p dangerouslySetInnerHTML={{ __html: this.state.contractsHTML}}></p>
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
                <div className="d-flex flex-column align-items-center">
                    <label className="mt-5 text-danger">* Personal Data is required</label>
                    <div className="mb-5 ml-5 mr-5 mt-3 p-5 border border-ligth shadow rounded d-flex flex-direction-center">
                        <button type="button" className="btn btn-danger ml-5 mr-5" disabled>
                            Disabled
                        </button>
                    </div>
                </div>
            );
        }

    }
}

const mapStateToProps = state => ({
    datosContracts: state.datosContracts.items,
    infoContracts: state.currentCheckout.data.contracts
});

export default connect(mapStateToProps)(Contracts);

