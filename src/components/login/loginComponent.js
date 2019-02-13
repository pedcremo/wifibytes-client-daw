/** @module ComponentsApp */
import React from 'react';
import { Utils } from '../../utils';
import { connect } from 'react-redux';
import Reaptcha from 'reaptcha';
import { Settings } from '../../settings';
import { login, recoverPass, changeValue } from './loginActions';
import IsAuth from '../isAuth';
/**
 * @class
 * Draw Login. A form to login
 */

const mapDispatchToProps = (dispatch) => ({
	login: (data) => dispatch(login(data)),
	recoverPass: (email) => dispatch(recoverPass(email)),
	changeValue: (value, target) => dispatch(changeValue(value, target))
});
const mapStateToProps = (state) => ({
	...state.loginReducer
});

class Login extends React.Component {
	constructor() {
		super();
		this.state = {};
	}
	recoverPass() {
		// Check if captcha is checked
		if (this.props.email.match(/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/)) {
			// Check if email is correct
			this.props.recoverPass(this.props.email);
		}
	}
	/** render  */
	render() {
		const {
			loading,
			showRecoverPass,
			error,
			changeView,
			changeValue,
			username,
			password,
			email,
			login,
			captcha
		} = this.props;
		return (
			<div className="loginForm">
				<IsAuth redirect={true} />
				<div className="login-acces">
					<form>
						<span>
							{/* INPUT USERNAME OR EMAIL */}
							<i className="fas fa-user fa-2x	" />
							<label
								className={!this.state.isclickedInput && !username ? 'down' : null}
								onMouseEnter={(ev) => (
									ev.preventDefault(),
									this.setState({
										isclickedInput: true
									})
								)}
								onMouseLeave={(ev) => (
									ev.preventDefault(),
									this.setState({
										isclickedInput: false
									})
								)}
							>
								USERNAME / EMAIL
							</label>
							<input
								type="text"
								required
								value={username}
								onChange={(ev) => changeValue(ev.target.value, 'username')}
								onMouseEnter={(ev) => (
									ev.preventDefault(),
									this.setState({
										isclickedInput: true
									})
								)}
								onMouseLeave={(ev) => (
									ev.preventDefault(),
									this.setState({
										isclickedInput: false
									})
								)}
							/>
						</span>
						{/* INPUT PASSWORD */}
						<span>
							<i className="fas fa-lock fa-2x	" />
							<label
								className={!this.state.isclickedPassword & !password ? 'down' : null}
								onMouseEnter={(ev) => (
									ev.preventDefault(),
									this.setState({
										isclickedPassword: true
									})
								)}
								onMouseLeave={(ev) => (
									ev.preventDefault(),
									this.setState({
										isclickedPassword: false
									})
								)}
							>
								{Utils.translate('login-acces-password')}
							</label>
							<input
								type="password"
								required
								value={password}
								onChange={(ev) => changeValue(ev.target.value, 'password')}
								onMouseEnter={(ev) => (
									ev.preventDefault(),
									this.setState({
										isclickedPassword: true
									})
								)}
								onMouseLeave={(ev) => (
									ev.preventDefault(),
									this.setState({
										isclickedPassword: false
									})
								)}
							/>
						</span>
						{/* ERROR */}
						{error ? <p display={error ? 'none' : 'block'}>{'Not correct password or username'}</p> : ''}
						{/* BUTTON LOGIN */}
						<button
							className="login-button btn"
							onClick={(ev) => (
								ev.preventDefault(), login({ username_or_email: username, password: password })
							)}
						>
							{/* LOADING IMAGE */}
							{loading ? (
								<img
									src="https://www.voya.ie/Interface/Icons/LoadingBasketContents.gif"
									width="50"
									height="40"
								/>
							) : (
								Utils.translate('login-button-acces')
							)}
						</button>
					</form>
					{/* BUTTON GO TO REGISTER */}
					<a onClick={() => changeView('register')} className="login-button btn left" href={'#/register'}>
						{Utils.translate('login-button-register')}
					</a>
					{/* SHOW RECUPERAR */}
					<p
						className="login-recuperar"
						onClick={() => (
							changeValue(!showRecoverPass, 'showRecoverPass'),
							username ? changeValue(username, 'email') : null
						)}
					>
						{Utils.translate('login-text-recover')}
					</p>

					{/* RECOVER */}
					<div className={showRecoverPass ? 'login-recuperar-input' : 'login-recov-pass'}>
						<form className="login-recover">
							<span>
								{/* INPUT EMAIL */}
								<input
									value={email}
									required
									onChange={(ev) => changeValue(ev.target.value, 'email')}
									pattern="^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$"
									placeholder={username}
								/>
								{/* BUTTON RECOVER PASSWORD */}
								<button
									onClick={(ev) => (ev.preventDefault(), this.recoverPass(captcha, email))}
									className="login-button btn"
								>
									{Utils.translate('login-button-recover')}
								</button>
							</span>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
