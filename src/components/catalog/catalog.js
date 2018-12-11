/** @module ComponentsApp */
import React from 'react';
import Families from "../catalog/families";

/**
 * @class
 * Draw article catalog that could be filtered by article family
 */
class Catalog extends React.Component {
    constructor(props) {   
        super(props);
        /*this.state={
            families:[]
        };*/
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
