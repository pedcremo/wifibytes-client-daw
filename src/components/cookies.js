
/** @module ComponentsApp */
import React from 'react';
import {Utils} from "../utils";

/**
 * @class
 * Draw cookies text information
 */
class Cookies extends React.Component {
    constructor(props){
        super(props);
        this.state={
            cookiesTexts:[],
            isLoading:true
        }
    }
    componentDidMount(){
        let that=this;
        Utils.get('/datos_empresa').then(function(response) {          
            let cookiesTexts = response.textos.filter((itemText) => {
                return itemText.key.match(/cookies/i) && itemText.lang==Utils.getUserLang();
              }).map((item) => {
                  return item.content;
            });
               
            that.setState({
                cookiesTexts: cookiesTexts,
                isLoading:false
            });
        }).catch(function(error) {
            console.log("Failed!", error);
        });
    }
    /** render  */
    render() {
        const isLoading = this.state.isLoading;
        return (
            <div>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <div className="p-5" dangerouslySetInnerHTML={{__html: this.state.cookiesTexts.join("")}}>                  
                </div>
            )}
            </div>
            
        );          
    }
}

export default Cookies; 
