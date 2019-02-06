/** @module ComponentsApp */
import {connect} from 'react-redux';
import React from 'react';
import LogIn from "./loginComponent";
import Register from "./registerComponent";
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
            <div className="login">
                <IsAuth redirect={true}/>
                <div className="login__top">
                    <div className="tab">
                        <button className="tablinks" id="loginButton" onClick={()=>changeView("login")}>LOGIN</button>
                        <button className="tablinks" id="registerButton" onClick={()=>changeView("register")}>NEED TO REGISTER ?</button>
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

const mapDispatchToProps = (dispatch, onwProps) =>({
    changeView : (view) => 
        dispatch(changeView(view)),
})
const mapStateToProps = state => ({
    ...state.loginReducer
});

export default connect(mapStateToProps,mapDispatchToProps)(SignIn);
