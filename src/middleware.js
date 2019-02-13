import { Utils } from './utils';
import { REGISTER, LOGOUT, LOGIN, ASYNC_START, ASYNC_END, AUTH_SET, NOT_AUTH } from './constants/actionTypes';

const localStorage = (store) => (next) => (action) => {
	if (action.localStorageSave) {
		next(action);
		const currentStore = store.getState();
		window.localStorage.setItem(action.reducer, JSON.stringify(currentStore[action.reducer]));
	} else if (action.localStorageUpdate) {
		next(action);
		const currentStore = store.getState();
		window.localStorage.setItem(action.reducer, JSON.stringify(currentStore[action.reducer]));
	} else if (action.localStorageGet) {
		console.log(window.localStorage);
		if (window.localStorage.getItem(action.reducer)) {
			const currentStore = JSON.parse(window.localStorage.getItem(action.reducer));
			store.dispatch({ type: action.action, currentStore });
		}
	} else next(action);
};

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
          action.payload = {error : error};
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
  //if (action.type === REGISTER || action.type === LOGIN) {
  if(action.type === LOGIN){
      if (!action.error) {
          Utils.setCookie('jwt',JSON.parse(action.payload).token ,365)
          window.localStorage.setItem('jwt', JSON.parse(action.payload).token);
          // agent.setToken(JSON.parse(action.payload).token);
      }
  } else if (action.type === LOGOUT) {
      Utils.setCookie('jwt','')
      window.localStorage.setItem('jwt', '');
      // agent.setToken(null);
  }

		return;
	}

	next(action);
};

const saveJWT = (store) => (next) => (action) => {
	if (action.type === REGISTER || action.type === LOGIN) {
		if (!action.error) {
			Utils.setCookie('jwt', action.payload.token, 365);
			window.localStorage.setItem('jwt', action.payload.token);
			// agent.setToken(JSON.parse(action.payload).token);
		}
	} else if (action.type === LOGOUT) {
		Utils.setCookie('jwt', '');
		window.localStorage.setItem('jwt', '');
		// agent.setToken(null);
	}

	next(action);
};

const isAuth = (store) => (next) => (action) => {
	if (action.isAuth) {
		let token = Utils.getCookie('jwt');
		if (token) {
			Utils.post('/api-token-verify/', { token: token }).then(
				(res) => {
					store.dispatch({
						type: AUTH_SET,
						user: res
					});
				},
				(error) => {
					console.log('ERROR isAuth Middleware : ', error);
					console.log(action);
					store.dispatch({
						type: NOT_AUTH
					});
				}
			);
		} else {
			next(action);
		}
	}
	next(action);
};

function isPromise(v) {
	return v && typeof v.then === 'function';
}
export { localStorage, saveJWT, promiseMiddleware, isAuth };
