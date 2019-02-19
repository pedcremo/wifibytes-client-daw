/** @module ComponentsApp */
import React from 'react';
import { connect } from 'react-redux';
import IsAuth from '../isAuth';
import { Utils } from '../../utils';
import { Redirect } from 'react-router-dom';
import InicioProfile from './inicioProfile';
import Settings from './settings';

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
		this.state = {
			view: <InicioProfile />
		};
		this.changeView = this.changeView.bind(this);
		if (this.props.user) this.props.onLoad(this.props.user.id_consumer);
	}

	changeView(value, ev) {
		ev.preventDefault();
		this.setState({
			view: value
		});
	}

	render() {
		const { isAuth, user, logout, profile } = this.props;
		return (
			<main>
				<IsAuth />
				{isAuth ? (
					<div className="profile">
						<div>
							<h1>Mi Cuenta</h1>
							<ul>
								<li>
									<a onClick={(ev) => this.changeView(<InicioProfile />, ev)}>INICIO</a>
								</li>
								<li>
									<a onClick={(ev) => this.changeView(<div>MIS PEDIDOS</div>, ev)}>MIS PEDIDOS</a>
								</li>
								<li>
									<a onClick={(ev) => this.changeView(<div>MIS LÍNEAS</div>, ev)}>MIS LÍNEAS</a>
								</li>
								<li>
									<a onClick={(ev) => this.changeView(<Settings />, ev)}>AJUSTES DE CUENTAS</a>
								</li>
								<li>
									<a onClick={(ev) => this.changeView(<div> MIS FACTURAS</div>, ev)}>MIS FACTURAS</a>
								</li>
							</ul>
							<button onClick={logout}>Logout</button>
						</div>
						<div>{this.state.view}</div>
					</div>
				) : null}
			</main>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
