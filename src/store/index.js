import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from "../reducers/rootReducer";
import { localStorage , saveJWT, promiseMiddleware , isAuth} from '../middleware'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk, localStorage,isAuth , promiseMiddleware , saveJWT )),
    (localStorage['redux-store']) ?
        JSON.parse(localStorage['redux-store']) :
        {}
);

store.subscribe(() => {
    localStorage['redux-store'] = JSON.stringify(store.getState())
})
