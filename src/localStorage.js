const localStorage = store => next => action =>{
    if(action.localStorageSave){
        next(action)
        const currentStore = store.getState()
        console.log(currentStore)
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

export default localStorage