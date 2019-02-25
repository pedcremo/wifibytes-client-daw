/** @module ComponentsApp */
import React from 'react';
import { connect } from 'react-redux';
import { GET_INICIO } from '../../constants/actionTypes';
import { Utils } from '../../utils';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

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
		if (!this.props.pedidoFactura) this.props.onLoad(this.props.user.id_consumer);
	}
	render() {
		const { loading, pedidoFactura } = this.props;
		console.log('entra');
		if (loading || !pedidoFactura) return <h1>Loading...</h1>;
		return (
			<main className="misPedidos">
				<h1>MIS PEDIDOS</h1>
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
										console.log(pedido);
										return (
											<tr key={pedido.idpedido} className="border-bottom-1">
												<th>{pedido.idpedido}</th>
												<th>{pedido.fecha}</th>
												<th>{pedido.totalLineas}</th>
												<th>{pedido.estadoText}</th>
												<th>{pedido.total.toFixed(2)}€</th>
												<th>
													<Modal size={'fullscreen'} trigger={<Button>DETALLE</Button>}>
														<Modal.Header>{pedido.idpedido}</Modal.Header>
														<Modal.Content>
															<Modal.Description className="mispedidosModal">
																<div className="articulos">
																	{pedido.lineas.map((linea) => {
																		return (
																			<div
																				key={linea.referencia}
																				className="linea"
																			>
																				<img
																					width="50px"
																					src={`${linea.referencia
																						.thumbnail}`}
																				/>
																				<span>
																					<p>
																						Articulo{' '}
																						{linea.idlineapresupuesto}
																					</p>
																					<h2>
																						{linea.referencia.descripcion}
																					</h2>
																					<p>Cantidad: {linea.cantidad}</p>
																					<p>
																						Precio/ud:{' '}
																						{linea.referencia.pvp}€
																					</p>
																				</span>
																			</div>
																		);
																	})}
																	<div className="total">
																		<h2>
																			Coste:{' '}
																			{pedido.total - pedido.formaEnvio.precio}€
																		</h2>
																		<h2>
																			Gastos de envío: {pedido.formaEnvio.precio}€
																		</h2>
																		<h2>Total: {pedido.total}€</h2>
																	</div>
																</div>
																<div className="ubicacion">
																	<div>
																		<h1>Dirección de envío</h1>
																		<h2>{pedido.direccionEnvio}</h2>
																		<h2>
																			{pedido.codpostalEnvio} -{' '}
																			{pedido.ciudadEnvio}
																		</h2>
																		<h2>
																			{'('}
																			{pedido.provinciaEnvio}
																			{')'}
																		</h2>
																	</div>
																	<div>
																		<h1>Datos de facturación</h1>
																		<h2>{pedido.nombreclienteFacturacion}</h2>
																		<h2>{pedido.cifnifFacturacion}</h2>
																		<h2>{pedido.direccion}</h2>
																		<h2>
																			{pedido.codpostal} - {pedido.ciudadEnvio}
																		</h2>
																		<h2>
																			{'('}
																			{pedido.provincia}
																			{')'}
																		</h2>
																	</div>
																	<div>
																		<h1>Información del pedido</h1>
																		<h2>
																			Forma de envío:
																			{pedido.formaEnvio.nombre}
																		</h2>
																		<h2>
																			Forma de pago:
																			{pedido.formaPago.nombre}
																		</h2>
																	</div>
																</div>
															</Modal.Description>
														</Modal.Content>
													</Modal>
												</th>
												<th>
													<button className="btn bg-danger text-light">
														<i className="far fa-file-pdf" />
													</button>
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
