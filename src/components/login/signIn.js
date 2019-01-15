/** @module ComponentsApp */
import React from 'react';
import {AuthService} from "../../utils";
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
    render() {
        return(
            <div className="login">
                <div className="center">
                    <div className="tab">
                        <button className="tablinks" id="loginButton" onClick={()=>this.changeType("login")}>Login</button>
                        <button className="tablinks" id="registerButton" onClick={()=>this.changeType("register")}>Register</button>
                    </div>
                </div>
                {this.state.type === "register"?
                    <Register />:
                    <LogIn />
                }
            </div>
        )
    }
}
export default SignIn;
