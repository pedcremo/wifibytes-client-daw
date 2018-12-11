/** @module ComponentsApp */
import React from 'react';
import Articles from "./articles";
import Families from "../catalog/families";
import Filters from "./filters";
import {Utils} from "../../utils";

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
        this.state = {
            filters: [],
            articles: [],
            isLoading: true
        };
    }

    componentDidMount() {
        let that = this;
        Promise.all([Utils.get("/filtros"), Utils.get("/articulo")]).then(function (results) {
            that.setState({
                filters: results[0],
                articles: results[1].results,
                isLoading: false
            });
        }).catch(function (error) {
            console.log("Failed!", error);
        });
    }
    /** render  */
    render() {
        return (
            <span>
            <Families />
            <Filters filters={this.state.filters} />
            <Articles articles={this.state.articles} />
            </span>
        );

    }
}

export default Catalog; 
