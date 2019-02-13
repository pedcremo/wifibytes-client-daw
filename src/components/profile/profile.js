/** @module ComponentsApp */
import React from 'react';
import { connect } from 'react-redux';
import IsAuth from '../isAuth';
import { Utils } from '../../utils';
import { Redirect } from 'react-router-dom';

import { LOGOUT, GET_PROFILE } from '../../constants/actionTypes';

/**
 * @class
 * Draw Login. A form to login
 */

const logout = () => {
	Utils.deleteCookie('jwt');
};

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch({ type: LOGOUT, payload: logout() }),
	onLoad: (id) =>
		dispatch({
			type: GET_PROFILE,
			payload: Utils.get(`/cliente/${id}`, null, true)
		})
});
const mapStateToProps = (state) => ({
	...state.isAuth
});

class Profile extends React.Component {
	constructor(props) {
		super(props);
		console.log(this.props);
		if (this.props.user) this.props.onLoad(this.props.user.id_consumer);
	}
	render() {
		const { isAuth, user, logout, profile } = this.props;
		if (!isAuth) return <Redirect to="/" />;
		return (
			<div className="profile">
				<IsAuth />
				{profile ? (
					<div>
						<div>
							<h1>Mi Cuenta</h1>
							<ul>
								<li>INICIO</li>
								<li>MIS PEDIDOS</li>
								<li>MIS LÍNEAS</li>
								<li>AJUSTES DE CUENTAS</li>
								<li>MIS FACTURAS</li>
							</ul>
							<button onClick={logout}>Logout</button>
						</div>
						<div>CONTAINER</div>
					</div>
				) : null}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
