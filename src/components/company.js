/** @module ComponentsApp */


import React from 'react';
/**
 * @class
 * Draw company information
 */
class Company extends React.Component {
    /**
     * @constructor
     * @param {json} datosEmpresaJSON 
     * @param {string} selectRule 
     */
    constructor(props) { 
        super(props);
		this.state={
            companyTexts:[],
            isLoading:true
        }
        //this.selectedTarget.innerHTML=this.render(this.inputJSON); 
    }
    
    componentDidMount(){
        let that=this;
        Utils.get("/datos_empresa").then(function(response) {          
		    let companyTexts= this.inputJSON.textos.filter((itemText) => {
                return itemText.key.match(/sobre/i) && itemText.lang==this.getUserLang();
              }).map((item) => {
                  return item.content;
            });
			that.setState({
                companyTexts: companyTexts,
                isLoading:false
			});
        }).catch(function(error) {
            console.log("Error", error);
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
                <div className="p-5" dangerouslySetInnerHTML={{__html: this.state.companyTexts.join("")}}>                  
                </div>
            )}
            </div>
            
        );          
    }
}

export default Company;