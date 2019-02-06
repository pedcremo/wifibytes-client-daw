import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from "../reducers/rootReducer";
import { localStorage , saveJWT, promiseMiddleware , isAuth} from '../middleware'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    (typeof(Storage) && window.localStorage.getItem('redux-store')) ?
        JSON.parse(window.localStorage.getItem('redux-store')) :
        {},
    composeEnhancers(applyMiddleware(thunk, localStorage,isAuth , promiseMiddleware , saveJWT ))

);

store.subscribe(() => {
    
    // Check browser support
    if (typeof(Storage) !== "undefined") {
        console.log("LOCALSTORAGE CHANGE");
        window.localStorage.setItem('redux-store',JSON.stringify(store.getState()));
    }
})
