import {Utils} from "./utils";

const library = [
  "SET_ITEM",
  "QUANTITY_ITEM",
  "DEL_ITEM"
]
const localStorager = store => next => action => {
  if(action.middleware){
      console.log(action);
    }
  next(action);
}

export default localStorager;
