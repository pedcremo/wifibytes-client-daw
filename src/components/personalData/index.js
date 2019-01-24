/** @module ComponentsApp */
import React from 'react';
import {AuthService} from "../../auth.service";
import UserChoice from "./userChoice"
import PersonalDataForm from "./personalDataForm";
import SignIn from "../login/signIn";

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
            console.log("Nos ha vuelto al padre todo poderoso");
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
        return(
            <div>
                <div>
                    <PersonalDataForm dataUser={this.state.auth}/>
                </div>
                <div id="myModal" className="modal" style={{visibility: this.state.styleModal ? 'visible' : 'hidden' }}>
                    <div className="modal-content">
                    <span className="close" onClick={()=>this.changeModal(false)}>&times;</span>
                        {this.state.selected == "login" ? <SignIn type="login" stat={this.changeIsAuth}/> :
                         this.state.selected == "register" ? <SignIn type="register" stat={this.changeIsAuth}/> :
                         this.state.selected == "none" ? this.printComponent("none") :
                         <UserChoice choice={this.printComponent}/> }
                    </div>
                </div>
                <button onClick={this.props.nextStep}>Next</button>
            </div>
        )
    }
}
export default Personal;