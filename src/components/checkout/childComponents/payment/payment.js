import React from 'react';
import {connect} from 'react-redux';
import {
  paymentUpdate,
  getPaymentTypes,
  setUncompleted,
  setCompleted,
  updateData,
  fieldUpdate,
} from '../../../../actions/paymentActions';
import MastercardVisaAmericanExpressForm
  from './paymentTypes/MastercardVisaAmericanExpress';
import DirectDebitForm from './paymentTypes/DirectDebit';
import EfectivoForm from './paymentTypes/Efectivo';
import {PaymentOptionsRadioButton} from './paymentTypes/paymentOptions';
import Summary from './paymentTypes/Summary';
import {PropTypes} from 'prop-types';
import Cart from '../../../cart/Cart';
import {Validations} from '../../../../validators/paymentFormValidators';
import {Agent} from '../../agent';
import CheckIfThereIsAtLeastOneItem
  from '../../libraries/validate_based_library.json';

const mapStateToProps = (state) => ({...state.payment, ...state.cartReducer});

/**
 * Payment main component, this is the father of all payment components
 */
class Payment extends React.Component {
  /**
   * The constructor here we have all onchange that call to the actions
   * and we put them in "this"
   */
  constructor() {
    super();
    /**
     * Here we have all dispatch, the dispatch are used to update
     * in reducer the data that we sent to them
     * @return {void}
     */
    this.changePaymentMethod = () => (ev) => {
      ev.preventDefault();
      this.props.dispatch(paymentUpdate(parseInt(ev.target.value)));
    };
    this.onChangeField = (field, value) => {
      this.props.dispatch(fieldUpdate(field, value));
    };
    this.onChangeCvv = () => (ev) => {
      this.onChangeField('cvv', parseInt(ev.target.value));
    };
    this.onChangeExpirationYear = () => (ev) => {
      this.onChangeField('expirationYear', parseInt(ev.target.value));
    };
    this.onChangeExpirationMonth = () => (ev) => {
      this.onChangeField('expirationMonth', parseInt(ev.target.value));
    };
    this.onChangeCardNumber = () => (ev) => {
      this.onChangeField('cardNumber', ev.target.value);
    };
    this.onChangeCardOwner = () => (ev) => {
      this.onChangeField('cardOwner', ev.target.value);
    };
  }
  /**
   * Is valid is a function that use all validations to verify that 
   * all component is valid
   * @return {booldean}
   */
  isValid() {
    return Validations.cvvIsValid(this.props.cvv) &&
    Validations.cardOwnerIsValid(this.props.cardOwner) &&
    Validations.expirationDateIsValid(this.props.expirationMonth,
        this.props.expirationYear) &&
        Validations.cardNumberIsValid(this.props.cardNumber);
  }

  /**
   * In componentDidMount we get all payment types from server and
   * save it in the reducer
   */
  componentDidMount() {
    this.props.dispatch(getPaymentTypes());
  }

  /**
   * When the component is updated it check out if it must to make valid the
   * component depending if we don't need credit card or if it is valid
   */
  componentDidUpdate() {
    this.props.paymentMethod !== 1 || this.isValid() ||
    !this.getCartItemsAndIfThereIsAtLeastOneProduct()[1] ?
    this.props.dispatch(setCompleted()) : this.props.dispatch(setUncompleted());
    this.props.paymentMethod === 1 ? this.props.dispatch(updateData('payment', {
      cardOwner: this.props.cardOwner, cardNumber: this.props.cardNumber,
      expirationMonth: this.props.expirationMonth,
      expirationYear: this.props.expirationYear, cvv: this.props.cvv,
    })) :
      this.props.dispatch(updateData('payment',
          {codpago: this.props.paymentMethod}));
  }

  /**
   *
   * @param {number} codPago
   * In paymentForm we pass him a @param codPago  and return the component choosed by user,
   * by default in reducer we put MastercardVisaAmericanExpressForm
   */
  paymentForm(codPago = 1) {
    switch (codPago) {
      case 2:
        return <EfectivoForm
          translate={this.context}
          /**
           * Efectivo
           * Gets from server the data to show in component
           */
          description={this.props.paymentMethods[0].descripcion} />;
      case 3:
        return <DirectDebitForm
          translate={this.context}
          /**
          * Direct Debit
          * Gets from server the data to show in component
          */
          description={this.props.paymentMethods[1].descripcion} />;
      default:
        return <MastercardVisaAmericanExpressForm
          translate={this.context}
          /**
           * Every change item method
           * When we write it updates the reducer
           */
          onChangeField={this.onChangeField}
          onChangeCvv={this.onChangeCvv}
          onChangeCardOwner={this.onChangeCardOwner}
          onChangeCardNumber={this.onChangeCardNumber}
          onChangeExpirationMonth={this.onChangeExpirationMonth}
          onChangeExpirationYear={this.onChangeExpirationYear}
          /**
           * Every value from every item from reducer
           * We do that to dont lose the data when the reducer render after
           * update an item
           */
          cardOwner={this.props.cardOwner}
          cardNumber={this.props.cardNumber}
          expirationYear={this.props.expirationYear}
          expirationMonth={this.props.expirationMonth}
          cvv={this.props.cvv}
          /**
           * Validations, to validate that data is the right
           */
          cardOwnerIsValid={Validations.cardOwnerIsValid(this.props.cardOwner)}
          cardNumberIsValid={Validations.cardNumberIsValid(this.props.cardNumber)}
          expirationDateIsValid={Validations.expirationDateIsValid(this.props.expirationMonth, this.props.expirationYear)}
          cvvIsValid={Validations.cvvIsValid(this.props.cvv)}
        />;
    }
  }

  /**
   * showPaymentOptionsRadioButton is a function that returns the payment options component,
   * we pass to him all payment methots from server, current payment method and the methot to
   * update it
   */
  showPaymentOptionsRadioButton() {
    return <PaymentOptionsRadioButton
      changePaymentMethod={this.changePaymentMethod}
      paymentOptions={this.props.paymentMethods}
      paymentMethod={this.props.paymentMethod} />;
  }

  showPaymentOptions() {
    return this.getCartItemsAndIfThereIsAtLeastOneProduct()[1] ?
      <div className="payment-components">
        {this.showPaymentOptionsRadioButton()}
        {this.paymentForm(this.props.paymentMethod)}
      </div> : null;
  }
  /** Gets the cartItems and checks if there is at least one product and returns an array with
   * that information
   */
  getCartItemsAndIfThereIsAtLeastOneProduct() {
    const cartItems = this.props.items;
    let thereIsAtLeastOneProduct = Agent.objectsToArray(cartItems, CheckIfThereIsAtLeastOneItem);
    thereIsAtLeastOneProduct = thereIsAtLeastOneProduct.filter((thing) => thing === 'productos');
    return [cartItems, thereIsAtLeastOneProduct.length > 0];
  }

  render() {
    return (
      <div className="payment-container">
        {this.showPaymentOptions()}
        <div className="cart-resume">
          {<Summary
            translate={this.context}
          />}
          {<Cart cartItems={this.getCartItemsAndIfThereIsAtLeastOneProduct()[0]} />}
        </div>
      </div>
    );
  }
}

Payment.contextTypes = {
  t: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Payment);
