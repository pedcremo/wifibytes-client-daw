/** @module ComponentsApp */
import React from 'react';
// import {AuthService} from "../../../../auth.service";
import UserChoice from "./userChoice"
import PersonalDataForm from "./personalDataForm";
import SignIn from "../../../login/signIn";
import PortabilidadForm from "./portabilidadForm";
import { connect } from "react-redux";
import {AuthService} from '../../../../auth.service'
import {
    getContactDataForm,
    updateContactDataFormServices,
    updateDatosProductos,
    getValidaForms,
    setUncompleted,
    setCompleted,
    updateData
} from "../../../../actions/personalDataFormActions";
import {getItems} from "../../../cart/cartActions";

import {Agent} from '../../agent';
import subitems_library from "../../libraries/subitems_based_library.json";

let mockClientes={particular:0, autonomo: 5, empresa: 1, extranjero: 2}
let mockCompanies=["orange", "vodafone", "jazztel", "yoigo", "pepephone"]

/**
 * @class
 * Draw Login. A form to login
 */
class Personal extends React.Component  {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            personalDataViewIsValid: false,
            styleModal: false,
            selected: false,
            isAuth: false,
            auth: {}
        }
        /**
         * print Component va a userChoice y agafa quin component vol pintar el usuari
         * login o register, o tambe que vol continuar sense login.
         * changeIsAuth es per a cuan anem al component de login o register lo que torna es
         * si el usuari s'ha logeat o registrat
         */
        this.printComponent = this.printComponent.bind(this);
        this.changeIsAuth = this.changeIsAuth.bind(this);
    }
    /**
     * Comprobem si esta logueat mitjançant AuthService, si esta logueat liu
     * posarem al changeIsAuth, si no esta logueat mostrarem el modal
     */
    componentDidMount(){
        this.props.dispatch(getContactDataForm());
        this.props.dispatch(getItems());
        
        /* Esta comprobando si el usuario esta logueado verificando el token de cookies
        * Si esta logueado tiene que pasar al componete form los datos del usuario a travez de props
        **/
        AuthService.isAuth().then(value =>{
            //console.log("EL usuario esta logeado", value)
            this.changeIsAuth(true)
            this.setState({
                auth: value
            })
        }).catch((err) => {
            //console.log("NO logueado", err)
            this.changeModal(true)
        })
        let array = [];
        /**Bring an object like this {movil:1, fijo:5....} */
        let obj = Agent.arrayToQuantityObject(this.props.cartItems, subitems_library)
        let cont = -1;
        let quantityMovil = obj["movil"]
        let quantityFijo = obj["fijo"]
        let quantity = quantityMovil + quantityFijo

        if ((this.props.datosProductos.length === 0) || (this.props.datosProductos.length!=quantity)) {
            if (quantity > 0 || (this.props.datosProductos.length!=quantity)) {
                for (const keyName in obj) {
                    if (`${keyName}` === "movil" || `${keyName}` === "fijo") {
                        for (let i = 0; i < parseInt(`${obj[keyName]}`); i++) {
                            cont++
                            array.push({
                                key: parseInt(`${cont}`),
                                tipo: "alta",
                                tipoTlf: `${keyName}`,
                                valido:true
                            });
                        }
                    }
                }
                this.props.dispatch(updateDatosProductos(array))
            }
        }

        

    }

    
     
    /**
     * 
     * @param {changeIsAuth} value
     * Cuan elegim si logear-se o registrarse anem a ixe component (login | register)
     * i cuan tornem ho recibim açi i cambiem el estat de isAuth que ens diu si esta o no
     * logeat i amaguem el modal per a que pugam omplir el formulari
     */
    changeIsAuth(value){
        if (value == true){
            this.setState({
                isAuth : value
            })
            setTimeout(()=>{this.changeModal(false) }, 1000);
        }else{
            console.log("Error, el usuario no se ha logeado/registrado")
        }
    }

    /**
     * 
     * @param {changeModal} value
     * Ens permitix cambiar el estat del modal, true se pinta i en false s'amaga 
     */
    changeModal(value){
        this.setState({
            styleModal : value
        })
    }
    /**
     * 
     * @param {changeType} res
     * Res es el valor de quin componen te que pintarse si login o register
     * this.state.selected indica quin component te que pintar-se 
     */
    changeType(res){
        this.setState({
            selected : res
        })
    }
    /**
     * 
     * @param {printComponent} value
     * Lo que fa es recollir del component userChoice que ha elegit el usuari,
     * despres va al ${changeType} y li asigna el valor de register o login i de esta
     * forma pintar uno o altre, si el valor que torna es none significa que vol
     * continuar sense logejarse ni registrarse i el modal se tanca per a rellenar
     * els formularis de PersonalDataForm
     */
    printComponent(value){
        switch(value){
            case "login":
                this.changeType(value)
            break;
            case "register":
                this.changeType(value)
            break;
            case "none":
                this.changeModal(false)
            break;
        }
        this.render()
    }
    
    componentDidUpdate(prevProps, prevState) {
        //////////////////// IS VALID ///////////////////////////
        //this.props.dispatch(setCompleted());
        //////////////////// INVALID ////////////////////////////
        //this.props.dispatch(setUncompleted());
        //console.log(prevProps.validForms, this.props.validForms)
        if (prevProps.validForms != this.props.validForms) {
          //  alert("2")
            if (this.props.validForms) {
                this.props.dispatch(setCompleted());
                this.props.dispatch(updateData("personalData", this.props.fields));
                
            //    console.log(1)
            } else {          
                this.props.dispatch(setUncompleted());
              //  console.log(2)
            }
            
        }
    }
    
    render() {
        /**
         * Usiang Agent and subitems_library we get the quantity of mobiles and fix phone rates.
         */
        return (
            <div>
                <PersonalDataForm dataUser={this.props.fields.datosPersonales} tipCliente={mockClientes} updateField={this.props.dispatch}/>

                <div className="grid-data-form">
                    {this.props.datosProductos.map((item, i)=> <PortabilidadForm tipo={item.tipoTlf}  key={i} id={i} datosProductos={item} companies={mockCompanies} updateField={this.props.dispatch}/>)}                
                </div>

                <div id="myModal" className="modal_manual" style={{visibility: this.state.styleModal ? "visible" : "hidden"}}>
                    <div className="modal_content_manual modal-content_manual">
                        <span className="close" onClick={() => this.changeModal(false)}>&times;</span>
                        {this.state.selected == "login" ? <SignIn type="login" stat={this.changeIsAuth} /> : 
                        this.state.selected == "register" ? <SignIn type="register" stat={this.changeIsAuth} />  :
                        this.state.selected == "none" ? this.printComponent("none") :
                        <UserChoice choice={this.printComponent} /> }
                    </div>
                </div>

                <button type="submit" className="btn btn-large btn-block btn-default">Validar Datos</button>
            </div>
        );
    }
}


const mapStateToProps = state => ({    
    fields: state.personalDataForm.fields,
    datosProductos: state.personalDataForm.fields.datosProductos,
    validForms: state.personalDataForm.validForms,
    loaded: state.personalDataForm.loaded,
    error: state.personalDataForm.error,
    cartItems: state.cartReducer.items
});


export default connect(mapStateToProps)(Personal);