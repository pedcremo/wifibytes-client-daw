/** @module ComponentsApp */
import React from 'react';
import {AuthService} from "../../../../auth.service";
import UserChoice from "./userChoice"
import PersonalDataForm from "./personalDataForm";
import SignIn from "../../../login/signIn";
import PortabilidadForm from "./portabilidadForm";
import { connect } from "react-redux";
import {
    getContactDataForm
} from "../../../../actions/personalDataFormActions";
import {Agent} from '../../agent';
import subitems_library from "../../libraries/subitems_based_library.json";

let mockCompanies=["orange", "vodafone", "jaxxtel", "yoigo", "pepephone"]
let mockClientes={particular:0, autonomo: 5, empresa: 1, extranjero: 2}
let serviciosContratados = [654654654, 987654321, 852741963, 14789652, 951159753]
/*
tarifas 
1: //Movil
*/
let items = [
    {
        id: "0cab50a1-ea99-4aa4-9a49-1983f06a5614"
    },
    {
        id: 5, 
        tarifa: [
            {
                id: 1
            },
            {
                id: 5
            }
        ]
    },
    {
        id: 6,
        tarifa: [
            {
                id: 2
            },
            {
                id: 4
            },
            {
                id: 1
            },
            {
                id: 1
            },
            {
                id: 1
            }
        ]
    }
]
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
        /**
        * Esta comprobando si el usuario esta logueado verificando el token de cookies
        * Si esta logueado tiene que pasar al componete form los datos del usuario a travez de props
        **/
        AuthService.isAuth().then(value =>{
            console.log("EL usuario esta logeado", value)
            this.changeIsAuth(true)
            this.setState({
                auth: value
            })
        }).catch((err) => {
            console.log("NO logueado", err)
            this.changeModal(true)
        })
        let tarifes = Agent.arrayToQuantityObject(items, subitems_library);
        console.log(tarifes);
    }


    updateFieldPerDataForm(form_new_state){
        this.props.dispatch(getContactDataForm());
        /* this.props.dispatch(updateContactDataForm("form_new_state")) */
    }
    /**
     * 
     * @param {changeIsAuth} value
     * Cuan elegim si logear-se o registrarse anem a ixe component (login | register)
     * i cuan tornem ho recibim açi i cambiem el estat de isAuth que ens diu si esta o no
     * logeat i amaguem el modal per a que pugam omplir el formulari
     */
    changeIsAuth(value){
        console.log(value)
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
    
    render() {
        let array=[];
        for (let i = 0; i < Agent.arrayToQuantityObject(items, subitems_library)["movil"]; i++) {            
            array.push(<PortabilidadForm key={i} id={i} companies={mockCompanies} updateField={this.props.dispatch}/>)
        }
        return(
            <div>
                <PersonalDataForm tipCliente={mockClientes} dataUser={this.props.fields.datosPersonales} updateField={this.props.dispatch}/>
                {<div className="grid-data-form">
                    {
                        array.map((item, i) => {
                            return item
                        })
                    }     
                </div> }

                <div id="myModal" className="modal_manual" style={{visibility: this.state.styleModal ? 'visible' : 'hidden' }}>
                    <div className="modal_content_manual login_background">
                    <span className="close" onClick={()=>this.changeModal(false)}>&times;</span>
                        {this.state.selected == "login" ? <SignIn type="login" stat={this.changeIsAuth}/> :
                         this.state.selected == "register" ? <SignIn type="register" stat={this.changeIsAuth}/> :
                         this.state.selected == "none" ? this.printComponent("none") :
                         <UserChoice choice={this.printComponent}/> }
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({    
    fields: state.personalDataForm.fields,
    loaded: state.personalDataForm.loaded,
    error: state.personalDataForm.error
});


export default connect(mapStateToProps)(Personal);