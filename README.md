# INTRODUCTION

Client web side app of wifibytes-server. Wifibytes is a communications service provider company. It is a kind of online web store with information about the company that let you contract mobile lines, internet broadband connections and buy some gadgets.

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
* Packaged with webpack
* Transpiled with babel
* Documented with jsdoc3

# Webpack

NICE TO READ https://www.valentinog.com/blog/webpack-tutorial/

# Ajax and fetch API 
NICE TO READ: https://dev.to/bjhaid_93/beginners-guide-to-fetching-data-with-ajax-fetch-api--asyncawait-3m1l

# TIPS
To solve some jest testing problems I've been forced to install

npm install babel-core@7.0.0-bridge.0 --save-dev

#First term evaluation artifacts
## First delivery points
* 1pt Facebook and twitter icons pointing in header or footer
* 3pts carousel in home 
* 3pts tests
* 1,5pts documentes jsdoc3 code
* 1,5pts footer and header templated and full implementes
* 1,5pts improvements

## Second Delivery
* 2,5pts unit testing new features
* 1pt documentation
* 1,5pts rates component
* 2,5pts catalog component
* 2pts i18n
* 1pt components inheritance. Create a parent

## Practical first term test

* 2pts checkURL method in Component class able to test if a URL is well formed. In case is bad formed try to fix it
* 2pts setUserLanguage behaviour change. Now we want a defaultLanguage property on Settings file. First time an user gets into our page we check browser locales, In case match (spanish,valencià/català,english ) we set user language accordingly, in case no single match we get defaultLanguage entry from settings as a default language for user
* 2pts improve get filter mechanism in order to suport pass of parameters to know how to filter by
* 2pts rates boxes color subtitle and fontawesome icons. Color information is on server side
* 2pts create subcomponent for creating rates boxes in home component and rates component