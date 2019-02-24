
/** @module ComponentsApp */
import React from 'react';
import Swal from 'sweetalert2';
import {
  Utils,
} from '../../../../utils';
import {
  updateField,
  initDatosPersonales,
} from '../../../../actions/personalDataFormActions';
import {validator} from './validation';
/* import Typecliente from './typeCliente'; */
import {connect} from 'react-redux';

const TIPO_CLIENTE_VALUE={0: 'particular', 1: 'empresa', 5: 'autonomo', 2: 'extranjero'};

const reader = new FileReader();

const mapDispatchToProps = (dispatch) => ({
  updateField: (data, field, error) => dispatch(updateField(data, field, error)),
  initDatosPersonales: (data) => dispatch(initDatosPersonales(data)),
});
/* trae el estado del reducer root*/
const mapStateToProps = (state) => ({
  ...state.personalDataForm.datosPersonales,
});

/**
 * @class
 * This component contain the Personal Data Form
 */
class PersonalForm extends React.Component {
  constructor(props) {
    super(props);
    this.previewFile = this.previewFile.bind(this);
    this.dniFile = React.createRef();
  }

  componentDidMount() {
    const {initDatosPersonales} = this.props;
    const token = Utils.getCookie('jwt');
    
    if (token) {
      /**
       * Realizamos una peticion pra traer los datos del usuario y rellenarlos en el formulario.
       * Cuando recibe los datos, se envian a redux para que se almacenen.
       */
      Utils.post('/api-token-verify/', {token: token})
          .then(
              (res) => {
                // console.log(res)
                Utils.get(`/cliente/${res.id_consumer}/`, null, true)
                    .then(
                        (res) => {
                          // console.log(res)
                          initDatosPersonales(res);
                          /* despach de objeto con acciones*/
                        },
                        (error) => {
                          /* arrancar el formulario con estado inicial */
                          console.log('cliente/${res.id_consumer : ', error);
                        }
                    );
              },
              (error) => {
                /* deberia abrirse el modal y arrancar el formulario con estado inicial*/
                console.log('ERROR Utils.post ', error);
              }
          );
    } else {
      /* deberia abrirse el modal y arrancar el formulario con estado inicial*/
    }
  }


  previewFile() {
    const reader = new FileReader();
    const can = this.refs['dniFile'].files[0];
    if (can) {
      if (can.size < 200000) {
        reader.onloadend = () => {
          updateField(reader.result, 'dniFile', validator(reader.result, 'nada'));
        };
        reader.readAsDataURL(can);
        
      } else {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Imagen muy grande',
        });
      }
    }
    return;
  }


  render() {
    const {
      updateField,
      nombre,
      apellido,
      email,
      birthday_omv,
      cifnif,
      telefono,
      dniFile,
      tipo_cliente,
      direccion,
      codpostal,
      ciudad,
      cuenta,
      provincia,
    } = this.props;

    /**
     * Es importante que el nombre de los inputs coincida con el combre del objeto en redux que guardara su value, ya que de esta manera reutilizamos el validador en el reducer cuando los datos son extaridos por primera vez o desde backend 
     */
    return (
      <form >

        <div className="container">
          { /** 
            PERSONAL DATA COLUMN
          */}
          <div class="row">
            <div class="col-md-6 col-lg-6">
              <h2>Datos personales</h2>

              <div class="form-group">
                <label 
                  className={nombre!=""?(validator(nombre, 'nombre')?"text-danger":"text-success"):""}
                  htmlFor="nombre">
                  Nombre
                </label>
                <input
                  className={`form-control form-control-lg ${nombre!=""?(validator(nombre, 'nombre')?"is-invalid":"is-valid"):""}`}
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={nombre}
                  onChange={(ev) => updateField(ev.target.value, ev.target.name, validator(ev.target.value, 'nombre'))}
                />              
                <div className={validator(nombre, 'nombre')?"invalid-feedback":"valid-feedback"}>
                  {nombre!=""?(validator(nombre, 'nombre')):""}
                </div>
              </div>

              <div class="form-group">
                <label 
                  className={apellido!=""?(validator(apellido, 'apellido')?"text-danger":"text-success"):""}
                  htmlFor="apellido">
                  Apellidos
                </label>
                <input
                  className={`form-control form-control-lg ${apellido!=""?(validator(apellido, 'apellido')?"is-invalid":"is-valid"):""}`}
                  id = "apellido"
                  name="apellido"
                  type="text"
                  value={apellido}
                  onChange={(ev) => updateField(ev.target.value, ev.target.name, validator(ev.target.value, 'apellido'))}
                />
                <div className={validator(apellido, 'apellido')?"invalid-feedback":"valid-feedback"}>
                  {apellido!=""?(validator(apellido, 'apellido')):""}
                </div>
              </div>

              <div class="form-group">
                <label 
                  className={tipo_cliente!=""?(validator(tipo_cliente, 'tipo_cliente')?"text-danger":"text-success"):""}
                  htmlFor = "tipo_cliente" >
                  Tipo de Cliente
                </label>
                <select
                  name = "tipo_cliente"
                  id = "tipo_cliente"
                  value={tipo_cliente}
                  onChange={(ev) => updateField(ev.target.value, ev.target.name, validator(ev.target.value, 'tipo_cliente'))}
                  className={`form-control form-control-lg ${tipo_cliente!=""?(validator(tipo_cliente, 'tipo_cliente')?"is-invalid":"is-valid"):""}`}>
                  {this.props.tipCliente.map((item, i)=> <option key={i} value={item}>{TIPO_CLIENTE_VALUE[item]}</option>)}
                </select>
                <div className={validator(tipo_cliente, 'tipo_cliente')?"invalid-feedback":"valid-feedback"}>
                  {tipo_cliente!=""?(validator(tipo_cliente, 'tipo_cliente')):""}
                </div>
              </div>

              <div class="form-group">
                <label 
                  className={cifnif!=""?(validator(cifnif, `DNI${TIPO_CLIENTE_VALUE[tipo_cliente]}`)?"text-danger":"text-success"):""}
                  htmlFor="cifnif">
                  Documento de identidad
                </label>
                <input
                  className={`form-control form-control-lg ${cifnif!=""?(validator(cifnif, `DNI${TIPO_CLIENTE_VALUE[tipo_cliente]}`)?"is-invalid":"is-valid"):""}`}
                  id = "cifnif"
                  name="cifnif"
                  type="text"
                  value={cifnif}
                  onChange={(ev) => updateField(ev.target.value, ev.target.name, validator(ev.target.value, `DNI${TIPO_CLIENTE_VALUE[tipo_cliente]}`))}
                />
                <div className={validator(cifnif, 'cifnif')?"invalid-feedback":"valid-feedback"}>
                  {cifnif!=""?(validator(cifnif, `DNI${TIPO_CLIENTE_VALUE[tipo_cliente]}`)):""}
                </div>
              </div>
              
              <div class="form-group">
                <label 
                  className={email!=""?(validator(email, 'email')?"text-danger":"text-success"):""}
                  htmlFor="email">
                  Email
                </label>
                <input
                  className={`form-control form-control-lg ${email!=""?(validator(email, 'email')?"is-invalid":"is-valid"):""}`}
                  id = "email"
                  name="email"
                  type="text"
                  value={email}
                  onChange={(ev) => updateField(ev.target.value, ev.target.name, validator(ev.target.value, 'email'))}
                />
                <div className={validator(email, 'email')?"invalid-feedback":"valid-feedback"}>
                  {email!=""?(validator(email, 'email')):""}
                </div>
              </div>

              
              

            </div>

            <div class="col-md-6 col-lg-6">
              <h2>Direccion</h2>            

              <div class="form-group">
                <label 
                  className={direccion!=""?(validator(direccion, 'direccion')?"text-danger":"text-success"):""}
                  htmlFor="direccion">
                  Direccion
                </label>
                <input
                  className={`form-control form-control-lg ${direccion!=""?(validator(direccion, 'direccion')?"is-invalid":"is-valid"):""}`}
                  id = "direccion"
                  name="direccion"
                  type="text"
                  value={direccion}
                  onChange={(ev) => updateField(ev.target.value, ev.target.name, validator(ev.target.value, 'direccion'))}
                />
                <div className={validator(direccion, 'direccion')?"invalid-feedback":"valid-feedback"}>
                  {direccion!=""?(validator(direccion, 'direccion')):""}
                </div>
              </div>

              <div class="form-group">
                <label 
                  className={codpostal!=""?(validator(codpostal, 'codpostal')?"text-danger":"text-success"):""}
                  htmlFor="codpostal">
                  Codigo postal
                </label>
                <input
                  className={`form-control form-control-lg ${codpostal!=""?(validator(codpostal, 'codpostal')?"is-invalid":"is-valid"):""}`}
                  id = "codpostal"
                  name="codpostal"
                  type="text"
                  value={codpostal}
                  onChange={(ev) => updateField(ev.target.value, ev.target.name, validator(ev.target.value, 'codpostal'))}
                />
                <div className={validator(codpostal, 'codpostal')?"invalid-feedback":"valid-feedback"}>
                  {codpostal!=""?(validator(codpostal, 'codpostal')):""}
                </div>
              </div>

              <div class="form-group">
                <label 
                  className={ciudad!=""?(validator(ciudad, 'ciudad')?"text-danger":"text-success"):""}
                  htmlFor="ciudad">
                  Ciudad
                </label>
                <input
                  className={`form-control form-control-lg ${ciudad!=""?(validator(ciudad, 'ciudad')?"is-invalid":"is-valid"):""}`}
                  id = "ciudad"
                  name="ciudad"
                  type="text"
                  value={ciudad}
                  onChange={(ev) => updateField(ev.target.value, ev.target.name, validator(ev.target.value, 'ciudad'))}
                />
                <div className={validator(ciudad, 'ciudad')?"invalid-feedback":"valid-feedback"}>
                  {ciudad!=""?(validator(ciudad, 'ciudad')):""}
                </div>
              </div>

              <div class="form-group">
                <label 
                  className={provincia!=""?(validator(provincia, 'provincia')?"text-danger":"text-success"):""}
                  htmlFor="provincia">
                  Provincia
                </label>
                <input
                  className={`form-control form-control-lg ${provincia!=""?(validator(provincia, 'provincia')?"is-invalid":"is-valid"):""}`}
                  id = "provincia"
                  name="provincia"
                  type="text"
                  value={provincia}
                  onChange={(ev) => updateField(ev.target.value, ev.target.name, validator(ev.target.value, 'provincia'))}
                />
                <div className={validator(provincia, 'provincia')?"invalid-feedback":"valid-feedback"}>
                  {provincia!=""?(validator(provincia, 'provincia')):""}
                </div>
              </div>

              <div class="form-group">
                <label 
                  className={cuenta!=""?(validator(cuenta, 'cuenta')?"text-danger":"text-success"):""}
                  htmlFor="cuenta">
                  Cuenta bancaria
                </label>
                <input
                  className={`form-control form-control-lg ${cuenta!=""?(validator(cuenta, 'cuenta')?"is-invalid":"is-valid"):""}`}
                  id = "cuenta"
                  name="cuenta"
                  type="text"
                  value={cuenta}
                  onChange={(ev) => updateField(ev.target.value, ev.target.name, validator(ev.target.value, 'cuenta'))}
                />
                <div className={validator(cuenta, 'cuenta')?"invalid-feedback":"valid-feedback"}>
                  {(cuenta&&cuenta!="")?(validator(cuenta, 'cuenta')):""}
                </div>
              </div>


            </div>
          </div>          
        </div>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalForm);
