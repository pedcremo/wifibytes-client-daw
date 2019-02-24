/** @module ComponentsApp */
import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
import { connect } from 'react-redux';

import { Button } from 'semantic-ui-react';
import { getItems, initDataServices, updateFieldDatosProd } from '../../../../actions/personalDataFormActions';
import { validator } from './validation';

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

		console.log(this.props);
		// alert("cts")
	}

	componentDidMount() {
		// const {items, initDataServices} = this.props;
		const { getItems } = this.props;
		new Promise((resolve, reject) => resolve(getItems())).then(() => {
			const { items, initDataServices } = this.props;
			console.log('this.props)', items);
			initDataServices(items);
		});
	}

	render() {
		const { datosProductos, updateFieldDatosProd, companies } = this.props;

		if (datosProductos.length == 0) {
			return 'Loading..........';
		}
		console.log(datosProductos);
		return (
			<div>
				{datosProductos.map((item, key) => {
					return (
						<div>
							<h2 className="services-data">
								{key + 1} Telefono {item.tipoTlf} / Tarifa {item.description}
							</h2>

							{/* <div class="btn-group btn-group-lg" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-secondary">Left</button>
              <button type="button" class="btn btn-secondary">Middle</button>
              <button type="button" class="btn btn-secondary">Right</button>
            </div> */}

							<div key={key} className="grid-data-form">
								<Button.Group size="large" className="centrar">
									<Button
										positive={item.tipo == 'portabilidad' ? true : false}
										onClick={() =>
											updateFieldDatosProd(
												'portabilidad',
												'tipo',
												validator('ev.target.value', 'portabilidad'),
												item.key
											)}
									>
										Portabilidad
									</Button>
									<Button.Or />
									<Button
										positive={item.tipo == 'alta' ? true : false}
										onClick={() =>
											updateFieldDatosProd(
												'alta',
												'tipo',
												validator('ev.target.value', 'alta'),
												item.key
											)}
									>
										Alta
									</Button>
								</Button.Group>
								{item.tipo == 'alta' && item.tipoTlf == 'fijo' ? (
									'Nuestro tecnico se pondra en contacto con usted el los proximos dias'
								) : item.tipo == 'alta' && item.tipoTlf == 'movil' ? (
									'Le asignaremos un numero de telefono nuevo y se lo enviremos a la direccion indicada'
								) : (
									<form>
										<div className="grid-data-form__fields">
											<div>
												<select
													className="form-control form-control-lg mio"
													onChange={(ev) =>
														updateFieldDatosProd(
															ev.target.value,
															ev.target.name,
															validator(ev.target.value, 'compania'),
															item.key
														)}
													value={item.compania}
													name="compania"
												>
													<option value="" />

													{companies.map((item) => <option value={item}>{item}</option>)}
												</select>
											</div>

											<div style={{ display: `${item['tipoTlf'] == 'fijo' ? 'none' : 'block'}` }}>
												<input
													className="form-control form-control-lg mio"
													placeholder={item.sim}
													name="sim"
													value={item.sim == null ? '' : item.sim}
													type="text"
													onChange={(ev) =>
														updateFieldDatosProd(
															ev.target.value,
															ev.target.name,
															validator(ev.target.value, 'sim'),
															item.key
														)}
												/>
												{/* <span className="text-danger">{(!this.state.error||this.state.error==undefined)? "":this.state.error}</span> */}
											</div>

											<div>
												<input
													className="form-control form-control-lg mio"
													placeholder="Numero de telefono"
													name="numTlf"
													value={item.numTlf == null ? '' : item.numTlf}
													onChange={(ev) =>
														updateFieldDatosProd(
															ev.target.value,
															ev.target.name,
															validator(ev.target.value, 'numTlf'),
															item.key
														)}
													type="number"
													/* onChange={this.handleInputChange} */
												/>
											</div>
										</div>
									</form>
								)}
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(PortabilidadForm);
