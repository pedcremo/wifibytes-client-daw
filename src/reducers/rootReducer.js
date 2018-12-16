import { combineReducers } from "redux";
import datosEmpresa from "./datosEmpresaReducer";
import datosHome from "./datosHomeReducer";
import currentRateDetails from "./currentRateDetailsReducer";
import datosArticulos from "./datosArticulosReducer";

export default combineReducers({
    datosHome,
    datosEmpresa,
    currentRateDetails,
    datosArticulos
});