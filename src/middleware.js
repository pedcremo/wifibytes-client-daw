import { REGISTER , LOGOUT, LOGIN , ASYNC_START , ASYNC_END} from "./constants/actionTypes";

const localStorage = store => next => action =>{
  if(action.localStorageSave){
      next(action)
      const currentStore = store.getState()
      window.localStorage.setItem(action.reducer,JSON.stringify(currentStore[action.reducer]))
  }else if(action.localStorageUpdate){
      next(action)
      const currentStore = store.getState()
      window.localStorage.setItem(action.reducer,JSON.stringify(currentStore[action.reducer]))
  }else if(action.localStorageGet){
      if(window.localStorage.getItem(action.reducer)){
          const currentStore = JSON.parse(window.localStorage.getItem(action.reducer))
          store.dispatch({ type: action.action, currentStore });
      }
  }else
      next(action)
}

const promiseMiddleware = store => next => action => {
    if (isPromise(action.payload)) {
      store.dispatch({ type: ASYNC_START, subtype: action.type });
  
      const currentView = store.getState().viewChangeCounter;
      const skipTracking = action.skipTracking;
  
      action.payload.then(
        res => {
          const currentState = store.getState()
          if (!skipTracking && currentState.viewChangeCounter !== currentView) {
            return
          }
          console.log('RESULT', res);
          action.payload = res;
          store.dispatch({ type: ASYNC_END, promise: action.payload });
          store.dispatch(action);
        },
        error => {
          const currentState = store.getState()
          if (!skipTracking && currentState.viewChangeCounter !== currentView) {
            return
          }
          console.log('ERROR', error);
          action.error = true;
          action.payload = error.response.body;
          if (!action.skipTracking) {
            store.dispatch({ type: ASYNC_END, promise: action.payload });
          }
          store.dispatch(action);
        }
      );
  
      return;
    }
  
    next(action);
  };

const saveJWT = store => next => action => {
  if (action.type === REGISTER || action.type === LOGIN) {
      if (!action.error) {
          window.localStorage.setItem('jwt', JSON.parse(action.payload).token);
          // agent.setToken(JSON.parse(action.payload).token);
      }
  } else if (action.type === LOGOUT) {
      window.localStorage.setItem('jwt', '');
      // agent.setToken(null);
  }

  next(action);
}

function isPromise(v) {
  return v && typeof v.then === 'function';
}
export { localStorage , saveJWT , promiseMiddleware};
