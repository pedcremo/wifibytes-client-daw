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
class MisPedidos extends React.Component {
	constructor(props) {
		super(props);
		this.props.onLoad(this.props.user.id_consumer);
	}
	render() {
		const { loading, pedidoFactura } = this.props;
		if (loading || !pedidoFactura) return <h1>Loading...</h1>;
		return (
			<main className="misPedidos">
				<h1>INICIO</h1>
				<div>
					{pedidoFactura.length > 0 ? (
						<div className="pedidos">
							<table>
								<tbody>
									<tr>
										<th>COD.</th>
										<th>FECHA.</th>
										<th>NUM. ARTÍCULOS</th>
										<th>ESTADO</th>
										<th>PRECIO</th>
										<th>OPCIONES</th>
										<th>FACTURA</th>
									</tr>
									{pedidoFactura.map((pedido) => {
										return (
											<tr key={pedido.idpedido}>
												<th>{pedido.idpedido}</th>
												<th>{pedido.fecha}</th>
												<th>{pedido.totalLineas}</th>
												<th>{pedido.estadoText}</th>
												<th>{pedido.total.toFixed(2)}€</th>
												<th>
													<button className="btn btn-primary">Opciones</button>
												</th>
												<th>
													<button className="btn btn-primary">Factura</button>
												</th>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					) : (
						<p>No tienes ningún pedido HACER UN PEDIDO</p>
					)}
				</div>
			</main>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MisPedidos);
