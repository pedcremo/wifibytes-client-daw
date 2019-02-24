/** @module ComponentsApp */
import React from 'react';
import { connect } from 'react-redux';
import IsAuth from '../isAuth';
import { Utils } from '../../utils';
import { Redirect } from 'react-router-dom';
import InicioProfile from './inicioProfile';
import Settings from './settings';
import MisPedidos from './misPedidos';

import { GET_PROFILE, GET_PROVINCES } from '../../constants/actionTypes';

import MisLineas from './misLineas';

const mapDispatchToProps = (dispatch) => ({
	onLoad: (id) =>{
		dispatch({
			type: GET_PROFILE,
			payload: Utils.get(`/cliente/${Utils.getCookie('id_consumer')}`)
		}),
		dispatch({
			type: GET_PROVINCES,
			payload: Utils.get(`/provincias/`)
		})
	}
});
/**
 * This component is using the isAuth and profile state
 */
const mapStateToProps = (state) => ({
	...state.isAuth,
	...state.profile
});
/**
 * PROFILE COMPONENT
 */
class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			view: <InicioProfile />
		};
		this.changeView = this.changeView.bind(this);
		//Load the Client Profile
		this.props.onLoad();

		// Set the propper view on the component via the key on the url
		switch (this.props.keyParam) {
			case 'mispedidos':
				this.state = {
					...this.state,
					view: <MisPedidos />
				};
				break;
			case 'mislineas':
				this.state = {
					...this.state,
					view: <MisLineas />
				};
				break;
			default:
				this.state = {
					view: <InicioProfile changeView={this.changeView} />
				};
				break;
		}
	}
	/**
	 * Function to change the current view of component
	 * 
	 * @param {String} taget 
	 * @param {*} value 
	 */
	changeView(taget, value, ev) {
		ev.preventDefault();
		this.setState({
			[taget]: value
		});
	}

	/**
	 * Function to logout, delete jwt and redirect
	 */
	logout() {
		Utils.deleteCookie('jwt');
		window.location = '';
	}

	/**
	 * Render
	 */
	render() {
		const { profile, loading, error, isAuth } = this.props;
		console.log(this.props)
		if ((loading && !profile) || !isAuth) return <img className="loading" src="/styles/image/loading.svg" />;
		if (!loading && error) return <Redirect to={'/'} />;
		// return <h1>asd</h1>;
		return (
			<main className="profile">
				<section>
					<h1>MI CUENTA</h1>
					<ul className="category">
						<li>
							<a
								onClick={(ev) =>
									this.changeView('view', <InicioProfile changeView={this.changeView} />, ev)}
							>
								INICIO
							</a>
						</li>
						<li>
							<a onClick={(ev) => this.changeView('view', <MisPedidos />, ev)}>MIS PEDIDOS</a>
						</li>
						<li>
							<a onClick={(ev) => this.changeView('view', <MisLineas />, ev)}>MIS LÍNEAS</a>
						</li>
						<li>
								<a onClick={(ev) => this.changeView(<Settings profile={profile} provinces={this.props.provinces} />, ev)}>AJUSTES DE CUENTAS</a>
						</li>
						<li>
							<a onClick={(ev) => this.changeView('view', <div>MIS FACTURAS</div>, ev)}>MIS FACTURAS</a>
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
