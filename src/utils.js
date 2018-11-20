import {Settings} from "./settings";

import english from "./i18n/english.json";
import spanish from "./i18n/spanish.json";
import valencia from "./i18n/valencia.json";


let CACHE_TEMPLATES = new Map();
let userLanguage = english;

function setUserLanguage(lang=""){
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
            //location.reload();//Reload current document
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
            console.log(" GET 200");
            // Resolve the promise with the response text
            CACHE_TEMPLATES.set(url,JSON.parse(req.response));
            if (filterFunction) {
                resolve(filterFunction(req.response));
            }else {
                resolve(JSON.parse(req.response));
            }
          }
          else {
            console.log(" GET 400");
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

/** When we get a json array we only keep the ones that match user language */
function filterPruneArrayByLang(jsonArray){ 
    let lang =getUserLang();
    if (typeof jsonArray === "string" ) {
        jsonArray=JSON.parse(jsonArray);
    }
   let aux= jsonArray.filter((item) => {
      return item.lang == lang; 
   });
   return aux;
}

/** At the moment some endpoints on server side only have valencian and spanish content. And moreover it's quite hardwired code to 
 * allow adding new languages.
 */
function getUserLang(){
    switch (getCookie("language")) {
        case "english":
            return "en"; //HAck to avoid crashing. We should improve some server i18n capabilities
        case "valencia":
            return "va";
        case "spanish":
            return "es";
        default:
            return "es";
    }

}
function getCookie(cname) {   
  try{ 
      var re = new RegExp(cname+"[\\s]*=[\\s]*([\\w]*)","i");
      return document.cookie.match(re)[1];
  }catch(e){
      return "";
  }
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function translate(key) {
    return userLanguage[key];
}

export {get,getCookie,setCookie,translate,setUserLanguage,getUserLang,filterPruneArrayByLang};