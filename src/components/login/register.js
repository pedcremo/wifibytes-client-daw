/** @module ComponentsApp */
import React from 'react';
import {Utils} from "../../utils";

/**
 * @class
 * Draw Login. A form to login
 */
class Register extends React.Component  {
    /**
     * @constructor
     */
    constructor() { 
        super();
	}
	
	componentDidMount(){

    }
 
    /** render  */
    render() {  
		return (
			<section>
                <form>
                    <div>
                        <td>
                            {/* NOM */}
                            <h4>{Utils.translate("register-name")}</h4>
                            <input placeholder={Utils.translate("register-name")}></input>
                        </td>
                        <td>
                            {/* COGNOMS */}
                            <h4>{Utils.translate("register-surname")}</h4>
                            <input placeholder={Utils.translate("register-surname")}></input>
                        </td>
                        <td>
                            {/* CORREU */}
                            <h4>{Utils.translate("register-email")}</h4>
                            <input placeholder={Utils.translate("register-email")}></input>
                        </td>
                    </div>
                    <div>
                        <td>
                            {/* PASSW */}
                            <h4>{Utils.translate("register-passs")}</h4>
                            <input placeholder={Utils.translate("register-passs")}></input>
                        </td>
                        <td>
                            {/* PASSW */}
                            <h4>{Utils.translate("register-repeatPassw")}</h4>
                            <input placeholder={Utils.translate("register-repeatPassw")}></input>
                        </td>
                    </div>
                    <div>
                        <td>
                            {/* CHECK POLITICA PRIV */}
                            <input type="checkbox"></input>
                            <a href="/#legal"> {Utils.translate("register-legal")} </a>
                        
                            {/* CHECK NO REBRE OFERTES */}
                            <input type="checkbox"></input>
                            <a> {Utils.translate("register-newslater")}</a>
                        </td>
                    </div>
                </form>
			</section>
		);
    }
}
export default Register;