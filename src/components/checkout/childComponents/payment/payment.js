import React from 'react'
import { connect } from "react-redux";
import {
  paymentUpdate,
  getPaymentTypes,
  setUncompleted,
  setCompleted,
  updateData,
  fieldUpdate
} from '../../../../actions/paymentActions';
import MastercardVisaAmericanExpressForm from './paymentTypes/MastercardVisaAmericanExpress';
import DirectDebitForm from './paymentTypes/DirectDebit';
import EfectivoForm from './paymentTypes/Efectivo';
import { PaymentOptionsRadioButton } from './paymentTypes/paymentOptions';
import Resume from './paymentTypes/Resume';
import { PropTypes } from 'prop-types';
import Cart from '../../../cart/Cart';
import { Regex } from '../../../../regex';
import { validations } from '../../../../validators/paymentFormValidators';
import { Agent } from '../../agent';
import CheckIfThereIsAtLeastOneItem from '../../libraries/validate_based_library.json';

const mapStateToProps = state => ({ ...state.payment });


class Payment extends React.Component {
  constructor() {
    super();
    this.changePaymentMethod = () => ev => {
      this.props.dispatch(paymentUpdate(parseInt(ev.target.value)));
    }
    this.onChangeField = (field, value) => {
      this.props.dispatch(fieldUpdate(field, value));
    }
    this.onChangeCvv = () => ev => {
      this.onChangeField("cvv", parseInt(ev.target.value))
    }
    this.onChangeExpirationYear = () => ev => {
      this.onChangeField("expirationYear", parseInt(ev.target.value))
    }
    this.onChangeExpirationMonth = () => ev => {
      this.onChangeField("expirationMonth", parseInt(ev.target.value))
    }
    this.onChangeCardNumber = () => ev => {
      this.onChangeField("cardNumber", ev.target.value)
    }
    this.onChangeCardOwner = () => ev => {
      this.onChangeField("cardOwner", ev.target.value)
    }
  }
  isValid() {
    return this.cvvIsValid() && this.cardOwnerIsValid() && this.expirationDateIsValid() && this.cardNumberIsValid();
  }
  expirationDateIsValid() {
    const today = new Date();
    return ((today.getMonth() + 1) > this.props.expirationMonth ? today.getFullYear() < this.props.expirationYear : today.getFullYear() <= this.props.expirationYear);
  }
  cvvIsValid() {
    return this.props.cvv.toString().match(Regex.cvv);
  }
  cardOwnerIsValid() {
    return this.props.cardOwner.match(Regex.cardOwner);
  }
  cardNumberIsValid() {
    let cardNumberProps = this.props.cardNumber.toString();
    let cardNumberArray = (cardNumberProps).toString(10).split("").map(t => { return parseInt(t) })
    cardNumberArray = cardNumberArray.map((number, i) => {
      return i % 2 === 0 ? number * 2 : number;
    })
    cardNumberArray = cardNumberArray.map((number, i) => {
      return (i % 2 === 0 && number >= 10) ? number - 9 : number;
    });
    let sum = 0;
    cardNumberArray.map(number => {
      sum += number;
    });
    return sum % 10 === 0;

  }


  componentDidMount() {
    this.props.dispatch(getPaymentTypes());
  }

  componentDidUpdate() {
    this.props.paymentMethod !== 1 || this.isValid() ? this.props.dispatch(setCompleted()) : this.props.dispatch(setUncompleted());
    this.props.paymentMethod === 1 ?
      this.props.dispatch(updateData('payment', {
        cardOwner: this.props.cardOwner,
        cardNumber: this.props.cardNumber, expirationMonth: this.props.expirationMonth,
        expirationYear: this.props.expirationYear, cvv: this.props.cvv
      })) :
      this.props.dispatch(updateData('payment', { codpago: this.props.paymentMethod }));
  }

  paymentForm(codPago = 1) {
    switch (codPago) {
      case 2:
        return <EfectivoForm
          translate={this.context}
          description={this.props.paymentMethods[0].descripcion} />; /**Efectivo */
      case 3:
        return <DirectDebitForm
          translate={this.context}
          description={this.props.paymentMethods[1].descripcion} />;
      default:
        return <MastercardVisaAmericanExpressForm
          onChangeField={this.onChangeField}
          onChangeCvv={this.onChangeCvv}
          onChangeCardOwner={this.onChangeCardOwner}
          onChangeCardNumber={this.onChangeCardNumber}
          onChangeExpirationMonth={this.onChangeExpirationMonth}
          onChangeExpirationYear={this.onChangeExpirationYear}
          translate={this.context}
          cardOwner={this.props.cardOwner}
          cardOwnerIsValid={this.cardOwnerIsValid()}
          cardNumberIsValid={this.cardNumberIsValid()}
          expirationDateIsValid={this.expirationDateIsValid()}
          cvvIsValid={this.cvvIsValid()}
          cardNumber={this.props.cardNumber}
          expirationYear={this.props.expirationYear}
          expirationMonth={this.props.expirationMonth}
          cvv={this.props.cvv} />;
    }
  }
  showPaymentOptionsRadioButton() {
    return <PaymentOptionsRadioButton
      changePaymentMethod={this.changePaymentMethod}
      paymentOptions={this.props.paymentMethods}
      paymentMethod={this.props.paymentMethod} />;
  }

  showPaymentOptions(thereIsAtLeastOneProduct) {
    return thereIsAtLeastOneProduct.length > 0 ?
      <div className="payment-components">
        {this.showPaymentOptionsRadioButton()}
        {this.paymentForm(this.props.paymentMethod)}
      </div> : null;
  }

  render() {
    const cartItems = JSON.parse(localStorage.getItem('cartReducer'));
    let thereIsAtLeastOneProduct = Agent.objectsToArray(cartItems.items, CheckIfThereIsAtLeastOneItem);
    thereIsAtLeastOneProduct = thereIsAtLeastOneProduct.filter(thing => thing === "productos");
    return (
      <div className="payment-container">
        {this.showPaymentOptions(thereIsAtLeastOneProduct)}
        <div className="cart-resume">
          {<Resume
            translate={this.context}
          />}
          {<Cart cartItems={cartItems} />}
        </div>
      </div>
    );

  }
}

Payment.contextTypes = {
  t: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(Payment);