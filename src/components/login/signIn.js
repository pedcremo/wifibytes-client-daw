/** @module ComponentsApp */
import {connect} from 'react-redux';
import React from 'react';
import LogIn from './loginComponent';
import Register from './RegisterComponent';
import IsAuth from '../isAuth';
import {changeView} from './loginActions';
/**
 * @class
 * Draw Login. A form to login
 */

class SignIn extends React.Component {
  componentWillMount() {
    this.props.changeView(window.location.href.split('/')[4]);
    window.addEventListener('hashchange', (e) => console.log('hashchange1', window.location.hash));
  }
  render() {
    const {changeView, view} = this.props;
    return (
      <div className="login">
        <div className="background" />
        <IsAuth redirect={true} />
        {view === 'register' ? (
					<Register stat={this.isAuth} />
				) : (
					<LogIn stat={this.isAuth} changeView={changeView} />
				)}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeView: (view) => dispatch(changeView(view)),
});
const mapStateToProps = (state) => ({
  ...state.loginReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
