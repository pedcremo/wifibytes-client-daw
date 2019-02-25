/** @module ComponentsApp */
import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
import { connect } from 'react-redux';

import { Button } from 'semantic-ui-react';
import { getItems, initDataServices, updateFieldDatosProd } from '../../../../actions/personalDataFormActions';
import { validator } from './validation';

/**
 * 
 * @param {getItems} dispatch Con esta funcion traemos los items de carrito
 * @param {initDataServices} data Con esta funcion inicializamos el estado de datosProductos, data es el carrito
 * @param {updateFieldDatosProd} {data, field, err, itemKey} Con esta funcion hacemos actualizaciones de un input concreto
 */
const mapDispatchToProps = (dispatch) => ({
	getItems: () => dispatch(getItems()),
	initDataServices: (data) => dispatch(initDataServices(data)),
	updateFieldDatosProd: (data, field, err, itemKey) => dispatch(updateFieldDatosProd(data, field, err, itemKey))
});

const mapStateToProps = (state) => ({
	...state.cartReducer,
	...state.personalDataForm
});

/**
 * @class
 * This component contain the Portabilidad Data Form
 */
class PortabilidadForm extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    const {getItems} = this.props;
    new Promise((resolve, reject) => resolve(getItems()))
        .then( () => {
          const {items, initDataServices} = this.props;
          //console.log('this.props)', items);
          initDataServices(items);
        });
  }


  render() {
    const {
      datosProductos,
      updateFieldDatosProd,
      companies,
    } = this.props;

    if (datosProductos.length ==0) {
      return '';
    }
    
    return (
      <div className="container">

        <h2 className="text-center" style={{marginTop:"50px"}}>Servicios Contratados</h2>
      
        <div className="row">
          {datosProductos.map((item, key)=>{
            return <div 
            key={key}
            className="col-md-12 col-lg-6"
            style={{marginTop:"50px"}}>

              <h3 className="services-data text-center">{key+1} Telefono {item.tipoTlf} / Tarifa {item.description}</h3>
              
              <div className="col align-self-center btn-group btn-group-lg" role="group" aria-label="Basic example">
                <button 
                  onClick={() => updateFieldDatosProd('portabilidad', 'tipo', validator('ev.target.value', 'portabilidad'), item.key)}
                  type="button" 
                  className = {`btn ${item.tipo=='portabilidad'?"btn-success":"btn-secondary"}`}
                  style={{width:"50%"}}>
                  PORTABILIDAD
                </button>
                <button 
                  onClick={() => updateFieldDatosProd('alta', 'tipo', validator('ev.target.value', 'alta'), item.key)}
                  type="button" 
                  className = {`btn ${item.tipo=='alta'?"btn-success":"btn-secondary"}`}
                  style={{width:"50%"}}>
                  ALTA
                </button>
              </div>


              {item.tipo=='alta' && item.tipoTlf=='fijo'?<p style={{marginTop:"20px"}}>Nuestro tecnico se pondra en contacto con usted el los proximos dias</p>:(item.tipo=='alta' && item.tipoTlf=='movil')?<p style={{marginTop:"20px"}}>Le asignaremos un numero de telefono nuevo y se lo enviremos a la direccion indicada</p>:(
                <form>
                  
                    <div className="form-group">
                      <label 
                        className={item.compania!=""?(validator(item.compania, 'compania')?"text-danger":"text-success"):""}
                        htmlFor = "compania" >
                        Tipo de Cliente
                      </label>
                      <select
                        className = {`form-control form-control-lg ${item.compania!=""?(validator(item.compania, 'compania')?"is-invalid":"is-valid"):""}`}
                        onChange={(ev) => updateFieldDatosProd(ev.target.value, ev.target.name, validator(ev.target.value, 'compania'), item.key)}
                        id = "compania"
                        value={item.compania}
                        name="compania">
                        
                        <option value=""></option>
                        {companies.map((item)=> <option value={item}>{item}</option>)}
                      </select>
                    </div>


                    <div 
                      className="form-group"
                      style={{display: `${item['tipoTlf']=='fijo'?'none':'block'}`}}>
                      <label 
                        className={item.sim!=""?(validator(item.sim, 'sim')?"text-danger":"text-success"):""}
                        htmlFor="sim">
                        Numero de tarjeta sim
                      </label>
                      <input
                        className={`form-control form-control-lg ${item.sim!=""?(validator(item.sim, 'sim')?"is-invalid":"is-valid"):""}`}
                        id="sim"
                        name="sim"
                        type="text"
                        value={item.sim}
                        onChange={(ev) => updateFieldDatosProd(ev.target.value, ev.target.name, validator(ev.target.value, 'sim'), item.key)}
                      />              
                      <div className={validator(item.sim, 'sim')?"invalid-feedback":"valid-feedback"}>
                        {item.sim!=""?(validator(item.sim, 'sim')):""}
                      </div>
                    </div>
                    

                    <div className="form-group">
                      <label 
                        className={item.numTlf!=""?(validator(item.numTlf, 'numTlf')?"text-danger":"text-success"):""}
                        htmlFor="numTlf">
                        Numero de tarjeta telefono a portar.
                      </label>
                      <input
                        className={`form-control form-control-lg ${item.numTlf!=""?(validator(item.numTlf, 'numTlf')?"is-invalid":"is-valid"):""}`}
                        id="numTlf"
                        name="numTlf"
                        type="tel"
                        value={item.numTlf}
                        onChange={(ev) => updateFieldDatosProd(ev.target.value, ev.target.name, validator(ev.target.value, 'numTlf'), item.key)}
                      />              
                      <div className={validator(item.numTlf, 'numTlf')?"invalid-feedback":"valid-feedback"}>
                        {item.numTlf!=""?(validator(item.numTlf, 'numTlf')):""}
                      </div>
                    </div>
                  
                </form>)}
              </div>
          
        })}
        </div>
      </div>

    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PortabilidadForm);
