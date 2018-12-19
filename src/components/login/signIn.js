/** @module ComponentsApp */
import React from 'react';
import {AuthService} from "../../utils";
import LogIn from "./login";
import Register from "./register";
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
            type : window.location.href.split('/')[4]
        }
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
            <div>
                <button onClick={()=>this.changeType("login")}>Login</button>
                <button onClick={()=>this.changeType("register")}>Register</button>
                {this.state.type === "register"?
                    <Register />:
                    <LogIn />
                }
            </div>
        )
    }
}
export default SignIn;