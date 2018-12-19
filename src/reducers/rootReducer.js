import { combineReducers } from "redux";
import datosEmpresa from "./datosEmpresaReducer";
import datosHome from "./datosHomeReducer";
import datosTarifa from "./datosTarifaReducer";
import currentRateDetails from "./currentRateDetailsReducer";
import datosArticulos from "./datosArticulosReducer";
import {i18nState} from "redux-i18n"

export default combineReducers({
    datosHome,
    datosEmpresa,
    datosTarifa,
    currentRateDetails,
    datosArticulos,
    i18nState
});