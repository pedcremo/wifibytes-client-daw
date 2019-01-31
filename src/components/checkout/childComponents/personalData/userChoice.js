/** @module ComponentsApp */
import React from 'react';
import {AuthService} from "../../../../utils";

/**
 * @class
 * Draw Login. A form to login
 */
class UserChoice extends React.Component  {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);
    }
    componentDidMount(){
    }
    render() {
        return(
            <div>
               <div>
                   <h2>Hemos detectado que no esta logeado, porfavor elija una opción:</h2>
                   <div className="selectionButtons">
                        <button onClick={()=>this.props.choice("login")}>Login</button>
                        <button onClick={()=>this.props.choice("none")}>Continuar igualmente</button>
                        <button onClick={()=>this.props.choice("register")}>Register</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default UserChoice;
