/** @module ComponentsApp */
import React from 'react';
import { connect } from 'react-redux';
import IsAuth from '../isAuth';
import { Utils } from '../../utils';
import { Redirect } from 'react-router-dom';
import InicioProfile from './inicioProfile';
import MisPedidos from './misPedidos';

import { LOGOUT, GET_PROFILE } from '../../constants/actionTypes';

/**
 * @class
 * Draw Login. A form to login
 */

const mapDispatchToProps = (dispatch) => ({
	onLoad: (id) =>
		dispatch({
			type: GET_PROFILE,
			payload: Utils.get(`/cliente/${Utils.getCookie('id_consumer')}`)
		})
});
const mapStateToProps = (state) => ({
	...state.isAuth,
	...state.profile
});

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			view: <InicioProfile />
		};
		console.log(this);
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
		const { profile, loading, error, isAuth } = this.props;
		if ((loading && !profile) || !isAuth) return <img className="loading" src="/styles/image/loading.svg" />;
		if (!loading && error) return <Redirect to={'/'} />;
		return (
			<main className="profile">
				<section>
					<h1>MI CUENTA</h1>
					<ul className="category">
						<li>
							<a onClick={(ev) => this.changeView(<InicioProfile />, ev)}>INICIO</a>
						</li>
						<li>
							<a onClick={(ev) => this.changeView(<MisPedidos />, ev)}>MIS PEDIDOS</a>
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
					<button className="btn btn-primary logoutButton" onClick={this.logout}>
						Logout <i className="fas fa-sign-in-alt" />
					</button>
				</section>
				<div className="content">{this.state.view}</div>
			</main>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
