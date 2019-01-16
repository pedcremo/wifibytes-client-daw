import { combineReducers } from "redux";
import datosEmpresa from "./datosEmpresaReducer";
import datosHome from "./datosHomeReducer";
import datosTarifa from "./datosTarifaReducer";
import currentRateDetails from "./currentRateDetailsReducer";
import datosArticulos from "./datosArticulosReducer";
import datosRates from "./datosRatesReducer";
import {i18nState} from "redux-i18n"
import cartReducer from "./cartReducer"

export default combineReducers({
    datosHome,
    datosRates,
    datosEmpresa,
    datosTarifa,
    currentRateDetails,
    datosArticulos,
    cartReducer,
    i18nState
});