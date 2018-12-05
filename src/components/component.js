/** @module ComponentsApp */

import {Utils} from "../utils";
/**
 * @class
 * Parent of all components. Mantain several functions common to all them
 * setState, getUserLang, Translator
 */
class Component  {
    /**
     * @constructor
     * @param {json} inputJSON 
     * @param {string} selectRule 
     */
    constructor(inputJSON,selectRule="") {   
		let selectedTarget;     
        try{ 
            if (selectRule) {
	            selectedTarget=document.querySelector(selectRule);
            
                if (!selectedTarget) throw("Error. Selected output target for component "+this.constructor.name+" doesn't exist");
                else this.selectedTarget=selectedTarget;
            }

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
    /** Get current user language */
    getUserLang(){
        return Utils.getUserLang();
    }
    /** Translator function used by all components */
    T(selectedKey) {
        let trans=Utils.translate(selectedKey);
        if (trans) return trans;
        else return selectedKey;    
    }
    /** Check if is a valid URL otherwise fix it */
    checkURL(hrefText) {
        let reURL= /(http:\/\/|https:\/\/)/;
        if (hrefText.match(reURL)) {
            return hrefText;
        }else{
            return "http://"+hrefText;
        }
    }
    /** Animate.css library to add animation to any component of the web
     * in this case we pick a random animation 
     */
    randomAnimation(){
        const animations = ["bounce",   "flash" ,"pulse"    ,"rubberBand","shake"   ,"headShake"    ,"swing",   "tada","wobble",    "jello" ,"bounceIn",    "bounceInDown","bounceInLeft"   ,"bounceInRight"    ,"bounceInUp","fadeIn"  ,"fadeInDown"   ,"fadeInDownBig"    ,"fadeInLeft","fadeInLeftBig"   ,"fadeInRight", "fadeInRightBig",   "fadeInUp","fadeInUpBig","rotateIn",    "rotateInDownLeft", "rotateInDownRight" ,"rotateInUpLeft","rotateInUpRight","jackInTheBox","rollIn"    ,"zoomIn"   ,"zoomInDown","zoomInLeft", "zoomInRight"   ,"zoomInUp" ,"slideInDown"  ,"slideInLeft"  ,"slideInRight" ,"slideInUp"]
        return "animated "+animations[Math.floor(Math.random() * (animations.length +1))];
    }
    /**
     * Set component state and render if we have a valid selectedTarget
     * @param {Object} objectProps 
     */
    setState(objectProps) {
        for (let [key, value] of Object.entries(objectProps)) {
            this.state[key]=value;       
        }
        if (this.selectedTarget) this.selectedTarget.innerHTML = this.render();
    }
}

export default Component;