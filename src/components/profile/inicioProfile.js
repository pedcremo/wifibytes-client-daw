/** @module ComponentsApp */
import React from 'react';
import { connect } from 'react-redux';
import { GET_INICIO } from '../../constants/actionTypes';
import { Utils } from '../../utils';

/**
 * @class
 * Draw Login. A form to login
 */

const mapDispatchToProps = (dispatch) => ({
	onLoad: (id) => {
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
		this.props.onLoad(this.props.user.id_consumer);
	}
	render() {
		const { loading, pedidoFactura } = this.props;
		if (loading || !pedidoFactura) return <h1>Loading...</h1>;
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
							<a href="#/profile/mispedidos" className="btn btn-primary">
								VER TODOS LOS PRODUCTOS
							</a>
						</div>
					) : (
						<p>No tienes ningún pedido HACER UN PEDIDO</p>
					)}
				</div>
				<div>No tienes facturas HACER UNA FACTURA</div>
			</main>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(InicioProfile);
