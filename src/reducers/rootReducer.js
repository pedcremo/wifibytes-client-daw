import { combineReducers } from "redux";
import datosEmpresa from "./datosEmpresaReducer";
import datosHome from "./datosHomeReducer";

export default combineReducers({
    datosHome,
    datosEmpresa,
    
});