import { combineReducers } from "redux";
import datosEmpresa from "./datosEmpresaReducer";
import datosHome from "./datosHomeReducer";
import datosTarifa from "./datosTarifaReducer";

export default combineReducers({
    datosHome,
    datosEmpresa,
    datosTarifa,
});