let CACHE_TEMPLATES = new Map();

// From Jake Archibald's Promises and Back:
// http://www.html5rocks.com/en/tutorials/es6/promises/#toc-promisifying-xmlhttprequest

function get(url) {
    // Return a new promise.
    return new Promise(function(resolve, reject) {
      if (CACHE_TEMPLATES.has(url)) {
        resolve(CACHE_TEMPLATES.get(url));
      }else{
        // Do the usual XHR stuff
        var req = new XMLHttpRequest();
        req.open('GET', url);
    
        req.onload = function() {
          // This is called even on 404 etc
          // so check the status
          if (req.status == 200) {
            // Resolve the promise with the response text
            CACHE_TEMPLATES.set(url,req.response);
            resolve(req.response);
          }
          else {
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
  

  export {get};