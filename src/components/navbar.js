import React from 'react';
import { Utils } from '../utils';
import { connect } from 'react-redux';
import { getDatosEmpresa } from '../actions/datosEmpresaActions';
import { Link } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import { setLanguage } from 'redux-i18n';
import { PropTypes } from 'prop-types';
import IsAuth from './isAuth';
import { SSL_OP_NO_QUERY_MTU } from 'constants';
import { getItems } from './cart/cartActions';

/**
 * Draw top menu navbar
 */

class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.props.authed();
		this.props.getDatosEmpresa();
		this.handleLangPicker = this.handleLangPicker.bind(this);
		this.props.getItems();
	}
	/**
   * Triggered when user changes language selector
   * @param {element} event
   */
	handleLangPicker(event) {
		// console.log(event.target.value);
		this.props.dispatch(setLanguage(event.target.value));
		Utils.setUserLanguage(event.target.value);
		//var a = document.getElementById("langPicker");
		//a.addEventListener("change", this.handleLangPicker.bind(this), false);
	}

	/** render  */
	render() {
		const { error, loading, datosEmpresa, value, cartItems, isAuth } = this.props;
		if (error) return <div>Error! </div>;
		if (loading) return <div>Loading...</div>;
		if (datosEmpresa) {
			const total = cartItems.items.reduce((cnt, o) => {
				if (o.quantity) {
					return cnt + o.quantity;
				} else {
					return cnt + 0;
				}
			}, 0);
			return (
				<HashRouter>
					<div className="navRender">
						<Link to="/" className="navbar-brand font-weight-bold">
							<img width="149px" height="49px" src={datosEmpresa.logo} />
						</Link>
						<button
							className="navbar-toggler"
							type="button"
							data-toggle="collapse"
							data-target="#navbarSupportedContent"
							aria-controls="navbarSupportedContent"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon text-dark" />
						</button>
						<div className="collapse navbar-collapse text-center" id="navbarSupportedContent">
							<ul className="navbar-nav ml-auto ">
								<li className="nav-item pt-3 text-success">
									<i className="fas fa-phone"> </i> {datosEmpresa.phone} &nbsp;
								</li>
								<li className="nav-item">
									<Link to="/catalog" className="nav-link text-dark pt-3">
										<span className="text-success">::</span> {this.context.t('menu-catalog')}
									</Link>
								</li>
								<li className="nav-item">
									<Link to="/rates" className="nav-link text-dark pt-3">
										<span className="text-success">::</span> {this.context.t('menu-rates')}
									</Link>
								</li>
								<li className="nav-item">
									<Link to="/company" className="nav-link text-dark pt-3">
										<span className="text-success">::</span> {this.context.t('menu-company')}
									</Link>
								</li>
								<li className="nav-item">
									<Link to="/contacte" className="nav-link text-dark pt-3">
										<span className="text-success">::</span> {this.context.t('menu-contact')}
									</Link>
								</li>
								<li className="nav-item">
									<Link to="/cart" className="nav-link text-dark pt-3">
										<span className="fa-stack fa-1x has-badge" data-count={total}>
											<i className="fa fa-circle fa-stack-2x fa-inverse" />
											<i className="fa fa-shopping-cart fa-stack-2x red-cart" />
										</span>
									</Link>
								</li>
								<li className="nav-item">
									{!isAuth ? (
										<Link to="/login" className="nav-link disabled pt-3">
											{this.context.t('menu-sign-in')} <i className="fas fa-sign-in-alt"> </i>
										</Link>
									) : (
										<Link to="/profile" className="nav-link disabled pt-3">
											<span>
												Profile
												<i className="fas fa-sign-in-alt" />
											</span>
										</Link>
									)}
								</li>

								<li className="nav-item">
									<a
										className="nav-link text-dark text-align-right"
										href={Utils.checkURL(datosEmpresa.twitter)}
									>
										<i className="fab fa-2x fa-twitter" />
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link text-dark" href={Utils.checkURL(datosEmpresa.facebook)}>
										<i className="fab fa-2x fa-facebook" />
									</a>
								</li>

								<li className="nav-item pt-3">
									<select
										id="langPicker"
										className="selectpicker"
										data-width="fit"
										value={value}
										onChange={this.handleLangPicker}
									>
										<option value="en">English</option>
										<option value="es">Español</option>
										<option value="ca">Valencià</option>
									</select>
								</li>
							</ul>
						</div>
					</div>
				</HashRouter>
			);
		}
	}
}

const mapStateToProps = (state) => ({
	...state.isAuth,
	cartItems: state.cartReducer,
	datosEmpresa: state.datosEmpresa.items,
	loading: state.datosEmpresa.loading,
	error: state.datosEmpresa.error,
	value: Utils.getCookie('language')
});
const mapDispatchToProps = (dispatch) => ({
	getDatosEmpresa: () => dispatch(getDatosEmpresa()),
	authed: () => dispatch({ type: null, isAuth: true }),
	getItems: () => dispatch(getItems())
});

Navbar.contextTypes = {
	t: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
