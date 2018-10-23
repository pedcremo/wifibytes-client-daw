# INTRODUCTION

Client web side app of wifibytes-server. Wifibytes is a communications provider company. It is a kind of web store with information about the company that let you contract mobile lines, internet connections and buy some gadgets.

The project is programmed in raw ES6 (ES2015) and transpiled, packaged, uglified and served using as a supporting tools; webpack, babel, webpack-dev-server, jsdoc ...
It's purpose is to become a client of wifibytes-server https://github.com/pedcremo/wifibytes-server-django

# Prerequisites

Before starting to program a running server should be set up in order to consume endpoints information from there.
You can do it locally. Clone https://github.com/pedcremo/wifibytes-server-django and follow instructions

An online test server exists but only for some authorized developers https://backend.wifibytes.com
To read available REST api on server point to https://backend.wifibytes.com/admin  login using an admin user and come back to https://backend.wifibytes.com , the API rest list documentation will be readable arrived to this stage.

# Steps to build and start the app

* npm install (only once first time we clone)
* npm start (Every time we want to start a programming session)
* Open http://localhost:8080 

# Key points 

* Bootstrap 4 . Pupils must create their own CSS style  
* Unit battery testing with jest
* Hot live reloading with webpack hmr
* PAckaged with webpack
* Transpiled with babel
* Documented with jsdoc

#Webpack

NICE TO READ https://www.valentinog.com/blog/webpack-tutorial/

#Ajax and fetch API 
NICE TO READ: https://dev.to/bjhaid_93/beginners-guide-to-fetching-data-with-ajax-fetch-api--asyncawait-3m1l

#TIPS
To solve some jest testing problems I've been forced to install

npm install babel-core@7.0.0-bridge.0 --save-dev