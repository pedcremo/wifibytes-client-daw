import { combineReducers } from "redux";
import datosEmpresa from "./datosEmpresaReducer";
import datosHome from "./datosHomeReducer";
import datosTarifa from "./datosTarifaReducer";
import currentRateDetails from "./currentRateDetailsReducer";
import datosArticulos from "./datosArticulosReducer";
import datosFamilies from "./datosFamiliesReducer";

export default combineReducers({
    datosHome,
    datosEmpresa,
    datosTarifa,
    currentRateDetails,
    datosArticulos,
    datosFamilies
});