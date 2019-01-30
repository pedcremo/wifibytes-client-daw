/** @module ComponentsApp */
import React from 'react';
import LogIn from "./loginComponent";
import Register from "./registerComponent";
/**
 * @class
 * Draw Login. A form to login
 */
class SignIn extends React.Component  {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            type : this.props.type ? this.props.type : window.location.href.split('/')[4] ? window.location.href.split('/')[4] : "login"
        }
        this.isAuth = this.isAuth.bind(this);
    }

    componentWillReceiveProps(){
        this.setState({
            type : window.location.href.split('/')[4]
        })
    }
    componentDidMount(){
    }

    changeType(res){
        this.setState({
            type : res
        })
    }

    /**
     * 
     * @param {isAuth} value
     * Açi el que fem es retornar al component de personal data (al index) que el usuari
     * ya s'ha logeat o registrat
     */
    isAuth(value){
        this.props.stat(value)
    }
    render() {
        return(
            <div className="login login_background">
                <div className="center">
                    <div className="tab">
                        <button className="tablinks" id="loginButton" onClick={()=>this.changeType("login")}>Login</button>
                        <button className="tablinks" id="registerButton" onClick={()=>this.changeType("register")}>Register</button>
                    </div>
                </div>
                {this.state.type === "register"?
                    <Register stat={this.isAuth}/>:
                    <LogIn stat={this.isAuth}/>
                }
            </div>
        )
    }
}
export default SignIn;
