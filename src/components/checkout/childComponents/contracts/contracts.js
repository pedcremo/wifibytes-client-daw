
/** @module ComponentsApp */
import React from 'react';
import { connect } from "react-redux";
import SignPad from './signaturePad';
import {Utils} from "../../../../utils";
import {PropTypes} from 'prop-types'

import {
    UPDATE_DATA,
    SET_COMPLETED,
    SET_UNCOMPLETED,
    GET_CONTRACTS
} from '../../../../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
    updateData: (key, data) =>
        dispatch({ type: UPDATE_DATA , payload: {key, data}}),
    setCompleted: () =>
        dispatch({ type: SET_COMPLETED }),
    setUncompleted: () =>
        dispatch({ type: SET_UNCOMPLETED }),
    getContracts: response => dispatch({ type: GET_CONTRACTS,  response}),
});

/**
 * @class
 * Read and accept the terms and conditions text information
 */
class Contracts extends React.Component {
    constructor(props) {
        super(props);
        if(this.props.infoContracts) {
            this.state = {
                data: this.props.infoContracts.data,
                showModal: this.props.infoContracts.showModal,
                next: this.props.infoContracts.next,
                contractsHTML: this.props.infoContracts.subTarifasLength === this.subTarifas().length? this.props.infoContracts.contractsHTML : '',
                subTarifasLength: this.props.infoContracts.subTarifasLength === this.subTarifas().length? this.props.infoContracts.subTarifasLength : this.subTarifas().length,
                mounted: false
            }
            this.props.updateData("contracts", this.state);
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
                subTarifasLength: 0,
                mounted: false
            };
        }
        this.reciveSign = this.reciveSign.bind(this);
        this.stateModal = this.stateModal.bind(this);
        

        this.getDatosContracts = () => {
            return Utils.get("/textos_contratos")
            .then(response => {this.props.getContracts({contracts: response}); return response;})
            .catch(error => this.props.getContracts({error: error}));  
        }
        this.setCompleted = () => this.props.setCompleted();
        this.setUncompleted = () => this.props.setUncompleted();
        this.updateData = (key,data) => this.props.updateData(key,data);
    }
    componentDidMount(){
        this.setState({ mounted: true });
        this.getDatosContracts().then(() => {
            this.mountContracts();
        });
        //this.props.dispatch(getContactDataForm());
    }

    componentDidUpdate(){
        if(!this.state.next)
            this.props.setUncompleted();
    }

    /**Set mounted to false */
    componentWillUnmount() {
        this.setState({ mounted: false });
    }

    /** Change the state to show or hide the modal of signing*/
    stateModal(state) {
        this.setState({ showModal: state });
    }

    /**Recive sign from the child */
    reciveSign(sign) {
        let that = this;
        navigator.geolocation.getCurrentPosition(succces, error);
        function succces(pos) {
            that.setState({
                showModal: false,
                next: true,
                data: {
                    ...that.state.data,
                        sign: sign,
                        pos: "Position: lat: "+ pos.coords.latitude +" long: "+ pos.coords.longitude,
                        time: 'Hour: ' + new Date()
                }
            }); 
            
            that.mountContracts();
            that.updateData("contracts", that.state);
            that.props.setCompleted();
        };
        function error() {
            that.setState({
                showModal: false,
                next: true,
                data: {
                    ...that.state.data,
                        sign: sign,
                        pos: '',
                        time: 'Hour: ' + new Date()
                }
            }); 
            
            that.mountContracts();
            that.updateData("contracts", that.state);
            that.props.setCompleted();
        }
    }

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

        if(this.props.datosContracts.length > 0){
            let re = new RegExp("("+subTarifasCon.join('|')+"|autorizacion)","i");
            const datosTexts = this.props.datosContracts.filter((itemText) => {
                return itemText.key.match(re);
            }).reverse().map((item) => {
                return item.title+" "+item.content;
            });

            if(this.state.mounted) {
                this.setState({ 
                    contractsHTML: eval('`' + datosTexts.join(' ') + '`'),
                    subTarifasLength: subTarifasCon.length 
                });
            }
        }     
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

    /** render  */
    render() {
        const { error, loading, datosContracts} = this.props;
        if (error) return (<div>Error! </div>);
        if (loading) return (<div>Loading...</div>);
        
        if(datosContracts.length > 0 && true){
            return (
                <div className="d-flex flex-column align-items-center">
                    {
                        !this.state.next? 
                            <p className="mt-5 text-danger">{this.context.t("sign-validation")}</p>
                        :
                            ''
                    }
                    <div className="mb-5 ml-5 mr-5 mt-3 p-5 border border-ligth shadow rounded d-flex flex-direction-center">
                        <button type="button" className="btn btn-primary ml-5 mr-5" data-toggle="modal" data-target="#modalContracts">
                            {this.context.t("btn-seeContracts")}
                        </button>
                    </div>
                    <div className="modal fade" id="modalContracts" tabIndex="-1" role="dialog" aria-labelledby="modalContracts" aria-hidden="true">
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLong">{this.context.t("btn-signContracts")}</h5>
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
                                            <button type="button" className="btn btn-primary" data-toggle="modal" onClick={() => this.stateModal(true)}>{this.context.t("btn-accept")}</button>
                                        :
                                            <button type="button" className="btn btn-primary" data-dismiss="modal">{this.context.t("btn-next")}</button>
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
                                        <h5 className="modal-title" id="exampleModalLong">{this.context.t("btn-signContracts")}</h5>
                                        <button type="button" className="close" aria-label="Close" onClick={() => this.stateModal(false)}>
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <SignPad transalte={this.context} onReciveSign={this.reciveSign} /> 
                                </div>
                            </div>
                        :   ''
                    }
                </div>
    
            );
        }else{
            return(
                <div className="d-flex flex-column align-items-center">
                    <label className="mt-5 text-danger">{this.context.t("validation-personalData")}</label>
                    <div className="mb-5 ml-5 mr-5 mt-3 p-5 border border-ligth shadow rounded d-flex flex-direction-center">
                        <button type="button" className="btn btn-danger ml-5 mr-5" disabled>
                        {this.context.t("btn-disabled")}
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

Contracts.contextTypes = {
    t: PropTypes.func.isRequired
  }

export default connect(mapStateToProps, mapDispatchToProps)(Contracts);

