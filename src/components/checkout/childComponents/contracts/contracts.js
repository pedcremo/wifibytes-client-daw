
/** @module ComponentsApp */
import React from 'react';
import { connect } from "react-redux";
import SignPad from './signaturePad';
import {Utils} from "../../../../utils";
import {PropTypes} from 'prop-types'

/* Import constants */
import {
    UPDATE_DATA,
    SET_COMPLETED,
    SET_UNCOMPLETED,
    GET_CONTRACTS
} from '../../../../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
    /**
     * @desc Change data contracts in Checkout reducer
     * @param key contains the key contracts
     * @param data contains the data of contracts
     */
    updateData: (key, data) =>
        dispatch({ type: UPDATE_DATA , payload: {key, data}}),
    /**
     * @desc Change state contracts to completed
     */
    setCompleted: () =>
        dispatch({ type: SET_COMPLETED }),
    /**
     * @desc Change state contracts to uncompleted
     */
    setUncompleted: () =>
        dispatch({ type: SET_UNCOMPLETED }),
    /**
     * @desc Get contracts from django server and save in contracts reducer
     * @param response answer that comes from the server
     */
    getContracts: response => dispatch({ type: GET_CONTRACTS,  response}),
});

const mapStateToProps = state => ({
    /* We take contracts info from the contract reducer */
    ...state.datosContracts,
    /* We obtain our information if it is saved to paint what we already had and to see if they have added or removed contracts */
    infoContracts: state.currentCheckout.data.contracts,
    /* Check to see if we have the personal data info to paint or not contracts */
    personalData: state.currentCheckout.data.personalData ? state.currentCheckout.data.personalData.datosPersonales : false,
    /* */
    ratesCart: state.cartReducer.items
});

/**
 * @class 
 * @desc Read and accept the terms and conditions text information
 */
class Contracts extends React.Component {
    constructor(props) {
        super(props);
        /**
         * If this.props.infoContracts have info. is saved in the state, else the state is declared empty. 
         * Then if subtarifas.length previously saved in the props is different to the new count of subtarifas, 
         * the contracts are declared empty otherwise used the contracts saved in props
         */
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
                    time: "",
                    day: new Date().getDay(),
                    month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][new Date().getMonth()],
                    year: new Date().getFullYear()
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
        
        /**
         * Call django server and return a Promise to use .then in componentDidMount
         * and call this.mountContracts() to load the contracts 
         */ 
        this.getDatosContracts = () => {
            return Utils.get("/textos_contratos")
            .then(response => {this.props.getContracts({contracts: response}); return response;})
            .catch(error => this.props.getContracts({error: error}));  
        }
        /**
         * Call function in mapDispatchToProps setCompleted 
         */
        this.setCompleted = () => this.props.setCompleted();
        /**
         * Call function in mapDispatchToProps setUncompleted 
         */
        this.setUncompleted = () => this.props.setUncompleted();
        /**
         * Call function in mapDispatchToProps updateData
         */
        this.updateData = (key,data) => this.props.updateData(key,data);
    }

    /**
     * @function componentDidMount
     * @desc Set the state of the component to true and get the contracts, 
     * if the personalData is null the contracts aren't mounted 
     */
    componentDidMount(){
        this.setState({ mounted: true });
        this.getDatosContracts().then(() => {
            if(this.props.personalData)
                this.mountContracts();
        });
    }

    /** 
     * @function componentDidUpdate
     * @desc If this.state.next is false it doesn't run setUncompleted 
     */
    componentDidUpdate(){
        if(!this.state.next)
            this.props.setUncompleted();
    }

    /**
     * @function componentWillUnmount
     * @desc Set mounted to false 
     */
    componentWillUnmount() {
        this.setState({ mounted: false });
    }

    /** 
     * @function stateModal
     * @desc Change the state to show or hide the modal of signing
     * @param state modal state to show or hidden
     */
    stateModal(state) {
        this.setState({ showModal: state });
    }

    /**
     * @function reciveSign
     * @desc Recive sign from the child, call mountContracts, 
     * save in checkout reducer and setCompleted the state
     * @param sign sign image
     */
    reciveSign(sign) {
        this.getPosition({ enableHighAccuracy: true })
            .then((pos) => {
                this.setState({
                    showModal: false,
                    next: true,
                    data: {
                        ...this.state.data,
                            sign: sign,
                            pos: pos.coords? "Position: lat: "+ pos.coords.latitude +" long: "+ pos.coords.longitude : '',
                            time: 'Hour: ' + new Date()
                    }
                }); 
                
                /* Mount contracts to save new data */
                this.mountContracts();
                /* Save new data of the contracts in checkout reducer */
                this.updateData("contracts", this.state);
                /* We inform contracts have been correctly performed */
                this.props.setCompleted();
            });
    }

    /** 
     * @function getPosition
     * @desc Get the user position 
     * @param settings
     */
    getPosition(settings) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                /** On Success*/
                function(position) {
                   resolve(position);
                },
                /**On Error */
                function(error) {
                    resolve(error);
                },
                settings
            );
        }); 
    }

    /**
     * @function mountContracts
     * @desc Mount the contract HTML
     */
    mountContracts() {
        /* Call function subTarifas */
        let subTarifasCon = this.subTarifas();

        /* If have the contracts the condition it's true */
        if(this.props.items.length > 0){
            /* Create regular expression to get the contracts */
            let re = new RegExp("("+subTarifasCon.join('|')+"|autorizacion)","i");
            /* Filter the contracts using regular expression, 
            use reverse to show the contract autorizacion at the end of the document, 
            and concat the title and content to make the HTML*/
            const datosTexts = this.props.items.filter((itemText) => {
                return itemText.key.match(re);
            }).reverse().map((item) => {
                return item.title+" "+item.content;
            });

            /**If the this.state.mounted is true then I add contractsHTML and subtarifas length to the state.
             * Eval is for to join the contracts one behind the other*/
            if(this.state.mounted) {
                this.setState({ 
                    contractsHTML: eval('`' + datosTexts.join(' ') + '`'),
                    subTarifasLength: subTarifasCon.length 
                });
            }
        }     
    }

    /**
     * @function subTarifas
     * @desc Get subtarifas from local storage and it will be we returned in a array 
     */
    subTarifas(){
        /* Declare cartReducer */
        let cartReducer = [];
        /* Parse JSON gotten from local storage, 
        make map to items to traverse all the array and get the subrates for the each tariffs, 
        traverse again the new array and if rates not exists include in the final array */
        this.props.ratesCart.map(item => {return item.subtarifas ? item.subtarifas : []})
        .map(item => {return item.map(item => {
            if(cartReducer.indexOf(item.id) < 0)
                cartReducer.push(item.id);
        })});
        /* return cartReducer where we keep id of subrates */
        return cartReducer;
    }

    /** 
     * @function render  
     * @desc render
     */
    render() {
        const { error, loading, items} = this.props;
        if (error) return (<p className="mt-5 text-danger">Error to load the contracts! </p>);
        if (loading) return (<div>Loading...</div>);
        
        if(items.length > 0 && this.props.personalData){
            return (
                <div className="d-flex flex-column align-items-center">
                    {
                        /**If this.state.next is false then the error message is shown */
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
                    {/* Here we show the modal with the contracts */}
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
                                        /**If this.state.next is false accept button is shown, else show next button */
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
                        /**If this.state.showModal is true, the modal with the canvas is showed */
                        this.state.showModal ?
                            <div id="myModal" className="modal_manual modal_manual_con">
                                <div className="modal-content_manual modal-content_manual_con">
                                    <div className="modal-header mb-4">
                                        <h5 className="modal-title" id="exampleModalLong">{this.context.t("btn-signContracts")}</h5>
                                        <button type="button" className="close" aria-label="Close" onClick={() => this.stateModal(false)}>
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <SignPad translate={this.context} onReciveSign={this.reciveSign} /> 
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

Contracts.contextTypes = {
    t: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Contracts);

