import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { store } from "./store";
import I18n from "redux-i18n"
import {Utils} from "./utils";
import {translations} from "./i18n/translations"

import App from './App';


document.addEventListener("DOMContentLoaded", function() {      
    ReactDOM.render(
        <Provider store={store}>
            <I18n translations={translations} initialLang={Utils.getCookie("language")}>
                <App />
            </I18n>
        </Provider>
        , document.getElementById('root'));  
 });
