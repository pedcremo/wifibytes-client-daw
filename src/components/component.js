import {translate,getCookie,getUserLang} from "../utils";

class Component  {

    constructor(inputJSON,selectRule) {   
		let selectedTarget;     
        try{ 
			selectedTarget=document.querySelector(selectRule);
            
            if (!selectedTarget) throw("Error. Selected output target for component "+this.constructor.name+" doesn't exist");
            else this.selectedTarget=selectedTarget;

            if (!inputJSON) throw("Error. InputJSON undefined for component "+this.constructor.name);
            else {
                if (typeof inputJSON === "string" ) {
                    this.inputJSON=JSON.parse(inputJSON);
                }else {
                    this.inputJSON=inputJSON;
                }
            }
        } catch(e){
			if (selectedTarget) selectedTarget.innerHTML="Problems rendering "+this.constructor.name+" -> "+e;
			throw e;
        }        
    }
    /** Check element is not undefined in any of their subparts */
    /*_(element) {
        console.log("CASTELLA");
        try{
            console.log("CASTELLA2");
            debugger;
            if (element) return element;

        }catch(e) {
            console.log("JJJJJJJJ");
            return "Undefined Element";
        }
    }*/
    getUserLang(){
        return getUserLang();
    }
    /** Translator function used by all components */
    T(selectedKey) {
        let trans=translate(selectedKey);
        if (trans) return trans;
        else return selectedKey;    
    }

}

export default Component;