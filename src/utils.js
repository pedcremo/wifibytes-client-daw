/** @module Utils */

import {Settings} from "./settings";
import english from "./i18n/english.json";
import spanish from "./i18n/spanish.json";
import valencia from "./i18n/valencia.json";

/**  
 * Map to cache JSON already got from server.
 * TODO: Try to improve it. It is very basic at the moment
 * We catch every new json get from server and only expires when we close web tab or
 * we change user language
*/
let CACHE_TEMPLATES = new Map();
let userLanguage = english;

/**  We set a language for user and store the same as a cookie afterwards we reload the page to apply changes 
* If there is no lang we set english as the default language for user  
* @param {string} lang - Choosen language.
*/
//ORIGINAL TO KEEP
/*function setUserLanguage(lang=""){
    if (!lang) {
        let language=getCookie("language");
        if (!language || language=="") {
            setCookie("language","english",365);
            lang="english";
        }else {
            lang=getCookie("language");
        }
    }else {
        if (getCookie("language")!==lang) {            
            setCookie("language",lang,365);
            CACHE_TEMPLATES.clear(); //flush cache entries
            location.reload();//Reload current document
        }
    }
    switch (lang){
        case "spanish": 
            userLanguage=spanish; 
            break;
        case "valencia": 
            userLanguage=valencia; 
            break;
        default:
            userLanguage=english;    
    }
}*/
/** TO DELETE */
function setUserLanguage(lang=""){
    if (!lang) {
        let language=getCookie("language");
        if (!language || language=="") {
            var userLang = navigator.language;//Get navigator locales
            
            userLang=userLang.substring(0, 2).toUpperCase();
            
            switch (userLang) {
                case "EN":
                    lang="english";
                    break;
                case "ES":
                    lang="spanish";
                    break;
                case "CA":
                    lang="valencia";
                    break;
                default:
                    lang=Settings.defaultLanguage;
            }
            setCookie("language",lang,365);
            //lang=Settings.defaultLanguage;
        }else {
            lang=getCookie("language");
        }
    }else {
        if (getCookie("language")!==lang) {            
            setCookie("language",lang,365);
            CACHE_TEMPLATES.clear(); //flush cache entries
            location.reload();//Reload current document
        }
    }
    switch (lang){
        case "spanish": 
            userLanguage=spanish; 
            break;
        case "valencia": 
            userLanguage=valencia; 
            break;
        default:
            userLanguage=english;    
    }
}

/** Get is our ajax caller implemented as a promise
 * From Jake Archibald's Promises and Back:
 * http://www.html5rocks.com/en/tutorials/es6/promises/#toc-promisifying-xmlhttprequest
*/
function get(url,filterFunction=null) {
    // Return a new promise.
    return new Promise(function(resolve, reject) {
      if (CACHE_TEMPLATES.has(url)) {
            resolve(CACHE_TEMPLATES.get(url));
      }else{
        // Do the usual XHR stuff
        var req = new XMLHttpRequest();
        req.open('GET', Settings.baseURL+url);
    
        req.onload = function() {
          // This is called even on 404 etc
          // so check the status
          if (req.status == 200) {
            // Resolve the promise with the response text
            CACHE_TEMPLATES.set(url,JSON.parse(req.response));
            if (filterFunction) {
                let fFilter=filterFunction[0];
                //resolve(fFilter(req.response));
                resolve(fFilter(req.response,filterFunction[1]));//TO REMOVE
            }else {
                resolve(JSON.parse(req.response));
            }
          }else {
            // Otherwise reject with the status text
            // which will hopefully be a meaningful error
            reject(Error(req.statusText));
          }
        };
    
        // Handle network errors
        req.onerror = function() {
          reject(Error("Network Error"));
        };
    
        // Make the request
        req.send();
      }
      
    });
}

/** When we get a json array we only keep the ones that match user language 
 * TODO: At the moment we only check that a 'lang' property from a gotten JSON
 * matchs current user language. Quite HARDWIRED.  
*/
/*function filterPruneArrayByLang(jsonArray){ 
    let lang =getUserLang();
    if (typeof jsonArray === "string" ) {
        jsonArray=JSON.parse(jsonArray);
    }
   let aux= jsonArray.filter((item) => {
      return item.lang == lang; 
   });
   return aux;
}*/
//TO REMOVE
function filterPruneArrayByLang(jsonArray,langPropName){ 
    
    let lang =getUserLang();
    if (typeof jsonArray === "string" ) {
        jsonArray=JSON.parse(jsonArray);
    }
   let aux= jsonArray.filter((item) => {
      return item[langPropName] == lang; 
   });
   return aux;
}

/** At the moment some endpoints on server side only have valencian and spanish content. And moreover it's 
 * quite hardwired code to allow adding new languages. A really pain in the neck 
 */
function getUserLang(){
    switch (getCookie("language")) {
        case "english":
            return "en"; 
        case "valencia":
            return "va";
        case "spanish":
            return "es";
        default:
            return "es";
    }

}
/**
 * Get cookie by name 
 * @param {string} cname 
 */
function getCookie(cname) {   
  try{ 
      var re = new RegExp(cname+"[\\s]*=[\\s]*([\\w]*)","i");
      return document.cookie.match(re)[1];
  }catch(e){
      return "";
  }
}
/**
 * Create new cookie
 * @param {string} cname  Cookie name
 * @param {string} cvalue  Cookie value
 * @param {number} exdays Cookie expiration in days  
 */
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**
 * Get key from userLanguage imported language selected taking into account user choosen lang
 * @param {string} key 
 */
function translate(key) {
    return userLanguage[key];
}

//TO REMOVE whole function
function changeBreadcrumb(routeText){
    //alert(routeText);
}
export {get,getCookie,setCookie,translate,setUserLanguage,getUserLang,filterPruneArrayByLang,changeBreadcrumb};