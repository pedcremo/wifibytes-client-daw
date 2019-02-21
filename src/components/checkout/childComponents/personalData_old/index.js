/** @module ComponentsApp */
import React from 'react';
// import {AuthService} from "../../../../auth.service";
import UserChoice from './userChoice';
import PersonalDataForm from './personalDataForm';
import SignIn from '../../../login/signIn';
import PortabilidadForm from './portabilidadForm';
import {connect} from 'react-redux';
import {AuthService} from '../../../../auth.service';
import {
  getContactDataForm,
  updateContactDataFormServices,
  updateDatosProductos,
} from '../../../../actions/personalDataFormActions';
import {getItems} from '../../../cart/cartActions';

import {Agent} from '../../agent';
import subitems_library from '../../libraries/subitems_based_library.json';

const mockClientes={particular: 0, autonomo: 5, empresa: 1, extranjero: 2};
const mockCompanies=['orange', 'vodafone', 'jazztel', 'yoigo', 'pepephone'];
/*
tarifas
1: //Movil
*/
const items = [
  {
    id: '0cab50a1-ea99-4aa4-9a49-1983f06a5614',
  },
  {
    id: 5,
    subtarifas: [
      {
        id: 3,
      },
      {
        id: 5,
      },
    ],
  },
  {
    id: 6,
    subtarifas: [
      {
        id: 2,
      },
      {
        id: 4,
      },
      {
        id: 1,
      },
      {
        id: 1,
      },
      {
        id: 1,
      },
    ],
  },
];
/**
 * @class
 * Draw Login. A form to login
 */
class Personal extends React.Component {
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
      auth: {},
    };
    /**
         * print Component va a userChoice y agafa quin component vol pintar el usuari
         * login o register, o tambe que vol continuar sense login.
         * changeIsAuth es per a cuan anem al component de login o register lo que torna es
         * si el usuari s'ha logeat o registrat
         */
    this.printComponent = this.printComponent.bind(this);
    this.changeIsAuth = this.changeIsAuth.bind(this);
    this.changeState = this.changeState.bind(this);
  }

  changeState(name, value) {
    new Promise((resolve, reject) =>{
      resolve(
          this.setState({
            [name]: value,
          }));
    });
  }

  /**
     * Comprobem si esta logueat mitjançant AuthService, si esta logueat liu
     * posarem al changeIsAuth, si no esta logueat mostrarem el modal
     */
  componentDidMount() {
    this.props.dispatch(getContactDataForm());
    this.props.dispatch(getItems());
    /* this.props.dispatch(getContactDataFormServices()); */

    /**
        * Esta comprobando si el usuario esta logueado verificando el token de cookies
        * Si esta logueado tiene que pasar al componete form los datos del usuario a travez de props
        **/
    AuthService.isAuth().then((value) =>{
      console.log('EL usuario esta logeado', value);
      this.changeIsAuth(true);
      this.setState({
        auth: value,
      });
    }).catch((err) => {
      console.log('NO logueado', err);
      this.changeModal(true);
    });

    if (this.props.isAuth) {
      console.log('El usuario esta logueado');
    }

    const array = [];
    const obj = Agent.arrayToQuantityObject(this.props.cartItems, subitems_library);
    let cont = -1;
    const quantityMovil = obj['movil'];
    const quantityFijo = obj['fijo'];
    const quantity = quantityMovil + quantityFijo;

    if (this.props.datosProductos.length === 0) {
      if (quantity > 0) {
        for (const keyName in obj) {
          if (`${keyName}` === 'movil' || `${keyName}` === 'fijo') {
            for (let i = 0; i < parseInt(`${obj[keyName]}`); i++) {
              cont++;
              array.push({
                key: parseInt(`${cont}`),
                value: {
                  tipo: 'alta',
                  tipoTlf: `${keyName}`,
                },
              });
            }
          }
        }
        this.props.dispatch(updateDatosProductos(array));
      }
    }
  }


  componentWillReceiveProps() {
    const obj = Agent.arrayToQuantityObject(this.props.cartItems, subitems_library);
    const quantityMovil = obj['movil'];
    const quantityFijo = obj['fijo'];

    if (this.props.datosProductos.length > 0 && (this.props.datosProductos.length != (quantityMovil + quantityFijo))) {
      const array = this.props.datosProductos;
      const reduxQuantityMovil = this.props.datosProductos.filter((item) => {
        if (item.value.tipoTlf == 'movil') {
          return item;
        }
      });
      const reduxQuantityFijo = this.props.datosProductos.filter((item) => {
        if (item.value.tipoTlf == 'fijo') {
          return item;
        }
      });

      if (reduxQuantityMovil.length < quantityMovil) {
        let cont = this.props.datosProductos.length;
        for (let i = 0; i < (quantityMovil - reduxQuantityMovil.length); i++) {
          array.push({
            key: cont++,
            value: {
              tipo: 'alta',
              tipoTlf: 'movil',
            },
          });
        }
      }
      if (reduxQuantityFijo.length < quantityFijo) {
        let cont = this.props.datosProductos.length;
        for (let i = 0; i < (quantityFijo - reduxQuantityFijo.length); i++) {
          array.push({
            key: cont++,
            value: {
              tipo: 'alta',
              tipoTlf: 'fijo',
            },
          });
        }
      }

      /* if ((reduxQuantityFijo.length > quantityFijo) || (reduxQuantityMovil.length > quantityMovil)) {
                let newArrayFijo=array.filter((item)=>{
                    if (item.value.tipoTlf==="fijo")
                        return item
                })
                let newArrayMovil = array.filter((item) => {
                    if (item.value.tipoTlf === "movil")
                        return item
                })
                let a1=[]
                let b1 = []
                if (reduxQuantityFijo.length > quantityFijo) {
                    newArrayFijo.splice(-(reduxQuantityFijo.length - quantityFijo));
                    a1 = newArrayFijo
                }

                if (reduxQuantityMovil.length > quantityMovil) {
                    newArrayMovil.splice(-(reduxQuantityMovil.length - quantityMovil));
                    b1 = newArrayMovil
                }
                array=a1.concat(b1)
                console.log(array);

            } */
      this.props.dispatch(updateDatosProductos(array));


      console.log('hay diferencias', array, reduxQuantityMovil, reduxQuantityFijo);
    }
  }

  updateFieldPerDataForm(form_new_state) {
    this.props.dispatch(getContactDataForm());
  }
  /**
     *
     * @param {changeIsAuth} value
     * Cuan elegim si logear-se o registrarse anem a ixe component (login | register)
     * i cuan tornem ho recibim açi i cambiem el estat de isAuth que ens diu si esta o no
     * logeat i amaguem el modal per a que pugam omplir el formulari
     */
  changeIsAuth(value) {
    if (value == true) {
      this.setState({
        isAuth: value,
      });
      setTimeout(()=>{
        this.changeModal(false);
      }, 1000);
    } else {
      console.log('Error, el usuario no se ha logeado/registrado');
    }
  }

  /**
     *
     * @param {changeModal} value
     * Ens permitix cambiar el estat del modal, true se pinta i en false s'amaga
     */
  changeModal(value) {
    this.setState({
      styleModal: value,
    });
  }
  /**
     *
     * @param {changeType} res
     * Res es el valor de quin componen te que pintarse si login o register
     * this.state.selected indica quin component te que pintar-se
     */
  changeType(res) {
    this.setState({
      selected: res,
    });
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
  printComponent(value) {
    switch (value) {
      case 'login':
        this.changeType(value);
        break;
      case 'register':
        this.changeType(value);
        break;
      case 'none':
        this.changeModal(false);
        break;
    }
    this.render();
  }


  render() {
    console.log(this.props.isAuth);
    if (this.state.personalDataViewIsValid) {
      console.log('El documento es valido');
    }
    /**
         * Usiang Agent and subitems_library we get the quantity of mobiles and fix phone rates.
         */
    /*  let obj = Agent.arrayToQuantityObject(this.props.cartItems, subitems_library)
        let quantityMovil = obj["movil"]
        let quantityFijo = obj["fijo"]
        let array = [];
        if (this.props.datosProductos.length > 0 && (this.props.datosProductos.length != (quantityMovil + quantityFijo))) {
            let reduxQuantityMovil = this.props.datosProductos.filter((item)=>{
                if (item.value.tipoTlf=="movil")
                    return item
            })
            let reduxQuantityFijo = this.props.datosProductos.filter((item) => {
                if (item.value.tipoTlf == "fijo")
                    return item
            })

            if (reduxQuantityMovil.length < quantityMovil) {
                for (let i = (reduxQuantityMovil.length - 1); i < quantityMovil; i++) {
                    array.push({
                        key: i,
                        value: {
                            tipo: "alta",
                            tipoTlf: "movil",
                        }
                    });
                }
            }
            if (reduxQuantityFijo.length < quantityFijo){
                for (let i = (reduxQuantityFijo.length - 1); i < quantityFijo; i++) {
                    array.push({
                        key: i,
                        value: {
                            tipo: "alta",
                            tipoTlf: "fijo",
                        }
                    });
                }
            }
            this.props.dispatch(updateDatosProductos(array))

            console.log("hay diferencias", reduxQuantityMovil, reduxQuantityFijo)
        } */

    console.log('render------+++++++++++', this.props.datosProductos.length, Object.keys(this.props.fields.datosProductos).length, this.props.fields.datosProductos);

    return (
      <div>
        <PersonalDataForm value={this.state.personalDataViewIsValid} valid={this.changeState} dataUser={this.props.fields.datosPersonales} tipCliente={mockClientes} updateField={this.props.dispatch}/>

        <div className="grid-data-form">
          {this.props.datosProductos.map((item, i)=>
            <PortabilidadForm tipo={item.value.tipoTlf} key={i} id={i} datosProductos={item} companies={mockCompanies} updateField={this.props.dispatch}/>)
          }
        </div>

        <div id="myModal" className="modal_manual" style={{visibility: this.state.styleModal ? 'visible' : 'hidden'}}>
          <div className="modal_content_manual modal-content_manual">
            <span className="close" onClick={() => this.changeModal(false)}>&times;</span>
            {this.state.selected == 'login' ? <SignIn type="login" stat={this.changeIsAuth} /> :
                        this.state.selected == 'register' ? <SignIn type="register" stat={this.changeIsAuth} /> :
                        this.state.selected == 'none' ? this.printComponent('none') :
                        <UserChoice choice={this.printComponent} /> }
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  fields: state.personalDataForm.fields,
  datosProductos: state.personalDataForm.fields.datosProductos,
  loaded: state.personalDataForm.loaded,
  error: state.personalDataForm.error,
  cartItems: state.cartReducer.items,
  ...state.isAuth,
});


export default connect(mapStateToProps)(Personal);
