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
                    {/* NOM */}
                    <input placeholder=""></input>

                    {/* COGNOMS */}
                    <input placeholder=""></input>


                    {/* CORREU */}
                    <input placeholder=""></input>


                    {/* PASSW */}
                    <input placeholder=""></input>


                    {/* PASSW */}
                    <input placeholder=""></input>

                    
                    {/* CHECK POLITICA PRIV */}
                    <input></input>


                    {/* CHECK NO REBRE OFERTES */}
                    <input></input>

                </form>
			</section>
		);
    }
}
export default Register;