/** @module ComponentsApp */
import {connect} from 'react-redux';
import React from 'react';
import LogIn from "./loginComponent";
import Register from "./RegisterComponent";
import IsAuth from '../isAuth'
import {changeView} from './loginActions'
/**
 * @class
 * Draw Login. A form to login
 */

class SignIn extends React.Component  {
    componentWillMount(){
        this.props.changeView(window.location.href.split('/')[4])
    }
    render() {
        const { changeView , view } = this.props
        return(
            <div className="login login_background">
                <IsAuth redirect={true}/>
                <div className="center">
                    <div className="tab">
                        <button className="tablinks" id="loginButton" onClick={()=>changeView("login")}>Login</button>
                        <button className="tablinks" id="registerButton" onClick={()=>changeView("register")}>Register</button>
                    </div>
                </div>
                {view === "register"?
                    <Register stat={this.isAuth}/>:
                    <LogIn stat={this.isAuth} changeView={changeView}/>
                }
            </div>
        )
    }
}

const mapDispatchToProps = dispatch =>({
    changeView : (view) =>
        dispatch(changeView(view)),
})
const mapStateToProps = state => ({
    ...state.loginReducer
});

export default connect(mapStateToProps,mapDispatchToProps)(SignIn);
