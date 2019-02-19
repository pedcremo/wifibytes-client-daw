import { combineReducers } from 'redux';
import datosEmpresa from './datosEmpresaReducer';
import datosHome from './datosHomeReducer';
import datosTarifa from './datosTarifaReducer';
import currentRateDetails from './currentRateDetailsReducer';
import datosArticulos from './datosArticulosReducer';
import datosRates from './datosRatesReducer';
import currentCheckout from './checkoutReducer';
import profile from './profileReducer';
import datosContracts from './datosContractsReducer';
import { i18nState } from 'redux-i18n';
import personalDataForm from './personalDataFormReducer';
import payment from './paymentReducer';
import loginReducer from '../components/login/loginReducer';
import cartReducer from '../components/cart/cartReducer';
import registerReducer from '../components/login/registerReducer';
import isAuth from './authReducer';

export default combineReducers({
	datosHome,
	datosRates,
	datosEmpresa,
	datosTarifa,
	currentRateDetails,
	datosArticulos,
	currentCheckout,
	personalDataForm,
	datosContracts,
	payment,
	cartReducer,
	i18nState,
	loginReducer,
	registerReducer,
	profile,
	isAuth
});
