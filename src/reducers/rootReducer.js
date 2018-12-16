import { combineReducers } from "redux";
import datosEmpresa from "./datosEmpresaReducer";
import datosHome from "./datosHomeReducer";
import currentRateDetails from "./currentRateDetailsReducer";

export default combineReducers({
    datosHome,
    datosEmpresa,
    currentRateDetails
});