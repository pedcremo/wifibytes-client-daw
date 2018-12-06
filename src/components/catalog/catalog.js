/** @module ComponentsApp */
import React from 'react';
import Families from "../catalog/families";
import {Utils} from "../../utils";

/**
 * @class
 * Draw article catalog that could be filtered by article family
 */
class Catalog extends React.Component {
    /**
     * @constructor
     * @param {json} datosEmpresaJSON 
     * @param {string} selectRule 
     */
    constructor(props) {   
        super(props);
        this.state={
            families:[]
        };
    }

    componentDidMount(){
        
    }
    /** render  */
    render() {

        return (
            <Families/>
        );
                  
    }
}

export default Catalog; 
