import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './store';
import I18n from 'redux-i18n';
import {Utils} from './utils';
import {translations} from './i18n/translations';

import App from './App';

/**
 * This is the entry point to our app. It defines a provider with the store and where is going to be displayed the app.
 *
 * <Provider /> is the higher-order component provided by React Redux that lets you bind Redux to React.
 *
 * Store holds the whole state tree of your application. The only way to change the state inside it is to dispatch an action on it.
 *
 * <App /> is a component which holds the webpage structure.
*/

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
      <Provider store={store}>
        <I18n translations={translations} initialLang={Utils.getCookie('language')} fallbackLang={Utils.getUserLang()}>
          <App />
        </I18n>
      </Provider>
      , document.getElementById('root'));
});
