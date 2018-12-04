
/** @module ComponentsApp */
import React from 'react';
import {get} from "../utils";

//import Component from "./component";
/**
 * @class
 * Draw cookies text information
 */
class Cookies extends React.Component {
    constructor(props){
        super(props);
        this.state={
            cookiesTexts:[]
        }
    }
    componentDidMount(){
        get('/datos_empresa').then(function(response) {          
            debugger;
            let cookiesTexts = response.textos.filter((itemText) => {
               // return itemText.key.match(/cookies/i) && itemText.lang==this.getUserLang();
               return itemText.key.match(/cookies/i);
              }).map((item) => {
                  return item.content;
            });
               
            this.setState({
                cookiesTexts: cookiesTexts
            });
        }).catch(function(error) {
            console.log("Failed!", error);
        });
    }
    /** render  */
    render() {
        return (
            <div className="p-5">
                {this.state.cookiesTexts.join("")}
            </div>
        );          
    }
}

export default Cookies; 
