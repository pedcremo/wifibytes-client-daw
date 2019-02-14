/** @module ComponentsApp */
import React from 'react';
import { connect } from 'react-redux';

/**
 * @class
 * Draw Login. A form to login
 */

const mapDispatchToProps = (dispatch) => ({});
const mapStateToProps = (state) => ({});

class InicioProfile extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<main className="inicioProfile">
				<h1>INICIO</h1>
				<div>No tienes ningún pedido HACER UN PEDIDO</div>
				<div>No tienes facturas HACER UNA FACTURA</div>
			</main>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(InicioProfile);
