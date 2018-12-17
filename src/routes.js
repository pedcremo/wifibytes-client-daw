/*
Based on 
http://krasimirtsonev.com/blog/article/A-modern-JavaScript-router-in-100-lines-history-api-pushState-hash-url
Singleton Router
*/
/*

var Router = {
    routes: [],
    mode: null,
    root: "/",
    config: function(options) {
        this.mode = options && options.mode && options.mode == "history" 
                    && !!(history.pushState) ? "history" : "hash";
        this.root = options && options.root ? "/" + this.clearSlashes(options.root) + "/" : "/";
        return this;
    },
    // it will tell us where we are at the moment.
    getFragment: function() {
        var fragment = "";
        if(this.mode === "history") {
            fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
            fragment = fragment.replace(/\?(.*)$/, "");
            fragment = this.root != "/" ? fragment.replace(this.root, "") : fragment;
        } else {
            var match = window.location.href.match(/#(.*)$/);
            fragment = match ? match[1] : "";
        }
        return this.clearSlashes(fragment);
    },
    //It's job is to remove the slashes from the beginning and from the end of the string.
    clearSlashes: function(path) {
        return path.toString().replace(/\/$/, "").replace(/^\//, "");
    },
    //New Route
    add: function(re, handler) {
        if(typeof re == "function") {
            handler = re;
            re = "";
        }
        this.routes.push({ re: re, handler: handler});
        return this;
    },
    //Delete a route
    remove: function(param) {
        for(var i=0, r; i<this.routes.length, r = this.routes[i]; i++) {
            if(r.handler === param || r.re.toString() === param.toString()) {
                this.routes.splice(i, 1); 
                return this;
            }
        }
        return this;
    },
    //Remove all added routes
    flush: function() {
        this.routes = [];
        this.mode = null;
        this.root = "/";
        return this;
    },
    //To check if a string route match with any existing route rule usually expresses in a regex form
    check: function(f) {
        var fragment = f || this.getFragment();
        for(var i=0; i<this.routes.length; i++) {
            var match = fragment.match(this.routes[i].re);
            if(match) {
                match.shift();
                this.routes[i].handler.apply({}, match);
                return this;
            }           
        }
        return this;
    },
    //Polling to get aquainted of any route change
    listen: function(callback) {
        var self = this;
        var current = self.getFragment();
        
        var fn = function() {       
            if(current !== self.getFragment()) {
                current = self.getFragment();
                self.check(current);
                callback();    
            }
        };
        clearInterval(this.interval);
        this.interval = setInterval(fn, 50);
        return this;
    },

    //Go to pointed path route
    navigate: function(path) {
        path = path ? path : "";
        if(this.mode === "history") {
            history.pushState(null, null, this.root + this.clearSlashes(path));    
        } else {
            //console.log("NAvigate PATH="+window.location.href.replace(/#(.*)$/, "") + "#" + path);
            
            window.location.href = window.location.href.replace(/#(.*)$/, "") + "#" + path;
            //console.log("Router->"+this.getFragment());
        }
        return this;
    }
};

// configuration
//Router.config({ mode: 'history'});
Router.config({ mode: ""});

// returning the user to the initial state
Router.navigate();

export {Router};*/

//Dependencies
import React from 'react';
import {Route, Switch} from 'react-router-dom';
//components
import Home from "./components/home";
import Legal from "./components/legal";
import Catalog from "./components/catalog/catalog";
import Company from "./components/company";
//import Page404 from './Components/Page404'



const AppRoutes = () =>
   (
       <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/legal" render={() => <Legal />} />
            <Route exact path="/catalog" render={() => <Catalog />} />
            <Route exact path="/company" render={() => <Company />} />
       </Switch>);


export default AppRoutes;
