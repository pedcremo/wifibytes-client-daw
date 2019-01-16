/** @module ComponentsApp */
import React from 'react';
import {AuthService} from "../../utils";

/**
 * @class
 * Draw Login. A form to login
 */
class controllerPD extends React.Component  {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);
        // this.state = {
        //     type : this.props.type ? this.props.type : window.location.href.split('/')[4] ? window.location.href.split('/')[4] : "personal-data"
        // }
    }

    // componentWillReceiveProps(){
    //     this.setState({
    //         type : window.location.href.split('/')[4]
    //     })
    // }
    componentDidMount(){
    }

    // changeType(res){
    //     this.setState({
    //         type : res
    //     })
    // }
    render() {
        return(
            <div>
                <h1>Prueba</h1>
            </div>
            // <div className="login">
            //     <div className="center">
            //         <div className="tab">
            //             <button className="tablinks" id="loginButton" onClick={()=>this.changeType("login")}>Login</button>
            //             <button className="tablinks" id="registerButton" onClick={()=>this.changeType("register")}>Continuar igualmente</button>
            //             <button className="tablinks" id="registerButton" onClick={()=>this.changeType("register")}>Register</button>
            //         </div>
            //     </div>
            //     {this.state.type === "register"?
            //         <Register />:
            //         <LogIn />
            //     }
            // </div>
        )
    }
}
export default controllerPD;
