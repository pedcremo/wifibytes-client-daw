import React from 'react';
import {Utils} from "../utils";

/**
 * Draw legal texts
 */
class Legal extends React.Component{

    constructor(props){
        super(props);
        this.state={
            legalTexts:[],
            isLoading:true
        };
    }
    componentDidMount(){
        let that=this;
        Utils.get("/datos_empresa").then(function(response) {          
            let cookiesTexts = response.textos.filter((itemText) => {
                return itemText.key.match(/legal/i) && itemText.lang==Utils.getUserLang();
              }).map((item) => {
                  return item.content;
            });
               
            that.setState({
                legalTexts: cookiesTexts,
                isLoading:false
            });
        }).catch(function(error) {
            console.log("Failed!", error);
        });
    }
    /** render  */
    render() {
        return (
            <div className="p-5" dangerouslySetInnerHTML={{__html: this.state.legalTexts.join("")}}>
            </div>
        );      
    }
}

export default Legal; 
