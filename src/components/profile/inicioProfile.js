/** @module ComponentsApp */
import MisPedidos from './misPedidos';
import React from 'react';
import { connect } from 'react-redux';
import { GET_INICIO } from '../../constants/actionTypes';
import { Utils } from '../../utils';

/**
 * @class
 * Draw Login. A form to login
 */

const mapDispatchToProps = (dispatch) => ({
	onLoadPedidos: (id) => {
		dispatch({
			type: GET_INICIO,
			payload: Utils.get(`/pedidoscli/?codcliente=${id}`)
		});
	}
});
const mapStateToProps = (state) => ({
	...state.isAuth,
	...state.profile
});
class InicioProfile extends React.Component {
	constructor(props) {
		super(props);
		if (!this.props.pedidoFactura) {
			console.log('entra');
			this.props.onLoadPedidos(this.props.user.id_consumer);
		}
	}
	render() {
		const { loading, pedidoFactura, changeView } = this.props;
		console.log(loading);
		console.log(pedidoFactura);
		if (loading || !pedidoFactura) return <img className="loading" src="/styles/image/loading.svg" />;
		return (
			<main className="inicioProfile">
				<h1>INICIO</h1>
				<div>
					{pedidoFactura.length > 0 ? (
						<div className="pedidos">
							<h1>Tu último pedido</h1>
							<p className="idPedido">{pedidoFactura[0].idpedido}</p>
							<span>
								<label>Importe :</label>
								<p>{pedidoFactura[0].total}€</p>
							</span>
							<span>
								<label>Total articulos :</label>
								<p>{pedidoFactura[0].totalLineas}</p>
							</span>
							<span>
								<label>Fecha de pedido:</label>
								<p>{pedidoFactura[0].fecha}</p>
							</span>
							<span>
								<label>ESTADO:</label>
								<p>{pedidoFactura[0].estadoText}</p>
							</span>
							<a
								href="#/profile/mispedidos"
								className="btn btn-primary"
								onClick={(ev) => changeView('view', <MisPedidos />, ev)}
							>
								VER TODOS LOS PRODUCTOS
							</a>
						</div>
					) : (
						<div>
							<h1>No tienes ningún pedido</h1>
							<button className="btn btn-primary">HACER UN PEDIDO</button>
						</div>
					)}
				</div>
				<div>
					<h1>No tienes facturas</h1>
					<button className="btn btn-primary">HACER UNA FACTURA</button>
				</div>
			</main>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(InicioProfile);
