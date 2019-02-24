/** @module ComponentsApp */
import React from 'react';
import { connect } from 'react-redux';
import { GET_LINEAS } from '../../constants/actionTypes';
import { Utils } from '../../utils';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

/**
 * @class
 * Draw Login. A form to login
 */

const mapDispatchToProps = (dispatch) => ({
	onLoad: (id) => {
		dispatch({
			type: GET_LINEAS,
			payload: Utils.get(`/mobilscli/?userId=${id}`)
		});
	}
});
const mapStateToProps = (state) => ({
	...state.isAuth,
	...state.profile
});

class MisLineas extends React.Component {
	constructor(props) {
		super(props);
		// State
		this.state = {
			selected: false
		};
		// Functions
		this.props.onLoad(this.props.user.id_consumer);
		// Bindings
		this.changeSelected = this.changeSelected.bind(this);
	}

	changeSelected(ev) {
		let selected = JSON.parse(ev.target.value);
		this.setState({
			selected: selected
		});
	}

	render() {
		const { loading, lineas, lineasCount } = this.props;
		const { selected } = this.state;
		if (loading || !lineas) return <img className="loading" src="/styles/image/loading.svg" />;
		console.log(lineas[0]);
		return (
			<main className="MisLineas">
				<h1>Mis Lineas</h1>
				<section className="elegirLinea">
					<select onChange={this.changeSelected} className="form-control">
						{lineas.map((linea) => {
							return (
								<option key={linea.id_mobilsclients} value={JSON.stringify(linea)}>
									{linea.mobil != '' ? linea.mobil : 'no tienes mobil'}
								</option>
							);
						})}
					</select>
					<Linea linea={selected ? selected : lineas[0]} />
				</section>
				<section>
					<Tarifa linea={selected ? selected : lineas[0]} />
				</section>
			</main>
		);
	}
}

const Tarifa = (props) => {
	return (
		<div className="tarifaselected">
			<h1>{props.linea.codtarifa.nombretarifa}</h1>
			<span>
				<i />
				<h2>{props.linea.codtarifa_info.subtarifas[0].subtarifa_cent_minuto}cent/min</h2>
			</span>
			<span>
				<i />
				<h2>{props.linea.codtarifa_info.subtarifas[0].subtarifa_datos_internet}GB/mes</h2>
			</span>
			<h2>{props.linea.codtarifa_info.subtarifas[0].subtarifa_tarifa.precio}€ IVA INCLUIDO</h2>
		</div>
	);
};

const Linea = (props) => {
	return (
		<div className="lineaselected">
			<span>Tu Numero : {props.linea.mobil}</span>
			<span>
				Itinerancia :
				<span>
					Procesando <button>{props.linea.roaming_info.status ? 'Activo' : 'Inactivo'}</button>
				</span>
			</span>
			<span>
				Búzon de voz :
				<span>
					Procesando <button>{props.linea.buzon_voz_info.status ? 'Activo' : 'Inactivo'}</button>
				</span>
			</span>
			<button className="activarlinea">ACTIVAR LINEA</button>
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(MisLineas);
