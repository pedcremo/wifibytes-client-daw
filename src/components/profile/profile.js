/** @module ComponentsApp */
import React from 'react';
import { connect } from 'react-redux';
import IsAuth from '../isAuth';
import { Utils } from '../../utils';
import { Redirect } from 'react-router-dom';
import InicioProfile from './inicioProfile';

import { LOGOUT, GET_PROFILE } from '../../constants/actionTypes';

/**
 * @class
 * Draw Login. A form to login
 */

const mapDispatchToProps = (dispatch) => ({
	onLoad: (id) =>
		dispatch({
			type: GET_PROFILE,
			payload: Utils.get(`/cliente/${Utils.getCookie('id_consumer')}`, null, true)
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
		this.props.onLoad();
	}

	changeView(value, ev) {
		ev.preventDefault();
		this.setState({
			view: value
		});
	}

	logout() {
		Utils.deleteCookie('jwt');
		window.location = '';
	}

	render() {
		const { profile, loading, error } = this.props;
		if (loading) return <h1>LOADING</h1>;
		if (!loading && error) return <Redirect to={'/'} />;
		return (
			<main className="profile">
				<section>
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
							<a onClick={(ev) => this.changeView(<div>MYRATES</div>, ev)}>AJUSTES DE CUENTAS</a>
						</li>
						<li>
							<a onClick={(ev) => this.changeView(<div>MIS FACTURAS</div>, ev)}>MIS FACTURAS</a>
						</li>
					</ul>
					<button onClick={this.logout}>Logout</button>
				</section>
				<div>{this.state.view}</div>
			</main>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
