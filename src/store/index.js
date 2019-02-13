import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from "../reducers/rootReducer";
import { localStorage , saveJWT, promiseMiddleware , isAuth} from '../middleware'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/** We initialize store state with localStorage redux-store entry.
 * It is a persistence backaup of our state if we close browser
 *
*/
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
        //window.localStorage.setItem('redux-store',JSON.stringify(store.getState()));
    }
})
