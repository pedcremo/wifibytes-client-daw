
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
    // console.log("this.props", this.props)
    if (token) {
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

        /* reader.src = reader.readAsDataURL(can);
                return new Promise((resolve, reject) => reader.addEventListener("load", () => resolve(updateField(reader.result, "dniFile", validator(reader.result, "email"))))) */
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

    // console.warn("RENDER DATAFORM", this.props, "------------------", nombre)
    /**
         * Es importante que el nombre de los inputs coincida con el combre del objeto en redux que guardara su value, ya que de esta manera reutilizamos el validador en el reducer cuando los datos son extaridos por primera vez o desde backend o desde localStorage
         */
    return (
      <form >

        <div className="container">
          { /** 
            PERSONAL DATA COLUMN
          */}
          <div class="row">
            <div class="col-md-6 col-lg-6">
              <h1>Hoala mundo</h1>

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

              
              

            </div>

            <div class="col-md-6 col-lg-6">
              
            </div>
          </div>          
        </div>


        
        <div>
          <h2>Datos Personales</h2>
          <div>
            <label className="grid-data-form__inputs">
                            Nombre
              <input
                className="form-control form-control-lg"
                name="nombre"
                type="text"
                value={nombre}
                onChange={(ev) => updateField(ev.target.value, ev.target.name, validator(ev.target.value, 'nombre'))}
              />
            </label>
            <br />
            <span className="text-danger">{!nombre? '': validator(nombre, 'nombre')}</span>
          </div>

          <br />
          <div>
            <label className="grid-data-form__inputs">
              <span className={`${validator(apellido, 'apellido')==null?'':'text-danger'}`}>Apellido</span>
              <input
                className={`form-control form-control-lg ${validator(apellido, 'apellido')==null?'':'border-danger'}`}
                name="apellido"
                type="text"
                value={apellido}
                onChange={(ev) => updateField(ev.target.value, ev.target.name, validator(ev.target.value, 'apellido'))}
              />
            </label>
            <br />
            <span className="text-danger">{!apellido? '': validator(apellido, 'apellido')}</span>
          </div>

          <div>
            <label className="grid-data-form__inputs">
                            Tipo de Cliente

              <select
                name = "tipo_cliente"
                value={tipo_cliente}
                onChange={(ev) => updateField(ev.target.value, ev.target.name, validator(ev.target.value, 'tipo_cliente'))}
                className="form-control form-control-lg">
                {this.props.tipCliente.map((item, i)=> <option key={i} value={item}>{TIPO_CLIENTE_VALUE[item]}</option>)}
              </select>
              <span className="text-danger">{!tipo_cliente? '': validator(tipo_cliente, 'tipo_cliente')}</span>
            </label>
          </div>
          <br />

          <br />
          <div>
            <label className="grid-data-form__inputs">
                            Documento de Identidad
              <input
                className="form-control form-control-lg"
                name="cifnif"
                type="text"
                value={cifnif}
                onChange={(ev) => updateField(ev.target.value, ev.target.name, validator(ev.target.value, `DNI${TIPO_CLIENTE_VALUE[tipo_cliente]}`))}
              />
            </label>
            <br />
            <span className="text-danger">{!cifnif? '': validator(cifnif, `DNI${TIPO_CLIENTE_VALUE[tipo_cliente]}`)}</span>
          </div>

          <br />


          {/* <br />
                    <div>
                        <label className="grid-data-form__inputs">
                            Fecha de nacimiento
                            <input
                            className="form-control form-control-lg"
                            name="birthday_omv"
                            type="date"
                            value={birthday_omv}
                            onChange={ev => updateField(ev.target.value, ev.target.name, validator(ev.target.value, "birthday_omv"))}
                            />
                        </label>
                        <br />
                        <span className="text-danger">{!birthday_omv? "": validator(birthday_omv, "birthday_omv")}</span>
                    </div> */}

          <br />
          <div>
            <input
              className="form-control form-control-lg"
              name="dniFile"
              type="file"
              /* value={dniFile} */
              ref = "dniFile"
              onChange={this.previewFile}
            />
            <br />
            <img src={dniFile} height="200" width="200" alt="Image preview..."/>
            {<span className="text-danger">{!dniFile? '': validator(dniFile, 'dniFile')}</span> }
          </div>


        </div>

        <div>
          <h2>Datos Facturacion</h2>
          <div>
            <label className="grid-data-form__inputs">
                            Email
              <input
                className="form-control form-control-lg"
                name="email"
                type="text"
                value={email}
                onChange={(ev) => updateField(ev.target.value, ev.target.name, validator(ev.target.value, 'email'))}
              />
            </label>
            <br />
            <span className="text-danger">{!email? '': validator(email, 'email')}</span>
          </div>

          {/* <div>
                        <label className="grid-data-form__inputs">
                            Telefono
                            <input
                            className="form-control form-control-lg"
                            name="telefono"
                            type="text"
                            value={telefono}
                            onChange={ev => updateField(ev.target.value, ev.target.name, validator(ev.target.value, "telefono"))}
                            />
                        </label>
                        <br />
                        <span className="text-danger">{!telefono? "": validator(telefono, "telefono")}</span>
                    </div> */}


          <div>
            <label className="grid-data-form__inputs">
                            Direccion
              <input
                className="form-control form-control-lg"
                name="direccion"
                type="text"
                value={direccion}
                onChange={(ev) => updateField(ev.target.value, ev.target.name, validator(ev.target.value, 'direccion'))}
              />
            </label>
            <br />
            <span className="text-danger">{!direccion? '': validator(direccion, 'direccion')}</span>
          </div>

          <div>
            <label className="grid-data-form__inputs">
                            Codigo Postal
              <input
                className="form-control form-control-lg"
                name="codpostal"
                type="text"
                value={codpostal}
                onChange={(ev) => updateField(ev.target.value, ev.target.name, validator(ev.target.value, 'codpostal'))}
              />
            </label>
            <br />
            <span className="text-danger">{!codpostal? '': validator(codpostal, 'codpostal')}</span>
          </div>

          <div>
            <label className="grid-data-form__inputs">
                            Ciudad
              <input
                className="form-control form-control-lg"
                name="ciudad"
                type="text"
                value={ciudad}
                onChange={(ev) => updateField(ev.target.value, ev.target.name, validator(ev.target.value, 'ciudad'))}
              />
            </label>
            <br />
            <span className="text-danger">{!ciudad? '': validator(ciudad, 'ciudad')}</span>
          </div>

          <div>
            <label className="grid-data-form__inputs">
                            Provincia
              <input
                className="form-control form-control-lg"
                name="provincia"
                type="text"
                value={provincia}
                onChange={(ev) => updateField(ev.target.value, ev.target.name, validator(ev.target.value, 'provincia'))}
              />
            </label>
            <br />
            <span className="text-danger">{!provincia? '': validator(provincia, 'provincia')}</span>
          </div>

          <div>
            <label className="grid-data-form__inputs">
                            Cuenta
              <input
                className="form-control form-control-lg"
                name="cuenta"
                type="text"
                value={cuenta}
                onChange={(ev) => updateField(ev.target.value, ev.target.name, validator(ev.target.value, 'cuenta'))}
              />
            </label>
            <br />
            <span className="text-danger">{!cuenta? '': validator(cuenta, 'cuenta')}</span>
          </div>


          {/*

                    <div>
                        <h4>Suba una imagen de su dni</h4>
                        <input
                        type="file"
                        id="file"
                        ref = "file"
                        name = "preview"
                        onChange={this.previewFile} /><br/>
                        <img name="preview" ref="preview" src={!this.state.preview?"":this.state.preview.value} height="130" width="100%" alt="Image preview..."></img>
                        <span className="text-danger">{!this.state.preview? "":this.state.preview.error}</span>
                    </div>
                </div>
 */}

        </div >
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalForm);
