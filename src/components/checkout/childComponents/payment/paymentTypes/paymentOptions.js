import React from 'react';

/**
 * We recive the payment methods
 * @param {*} props
 * @return {*} return the form with the methots payments
 */
export function PaymentOptionsRadioButton(props) {
  /**
   * If server don't return payment options we return null
   */
  if (props.paymentOptions.length === 0) {
    return (null);
  }
  /**
   * This function it return the button for each payment method recived from
   * the server
   */
  const options = props.paymentOptions.map((option, i) => {
    return (
      <label key={i}>
        <button onClick={props.changePaymentMethod()} value={option.codpago}
          positive={props.paymentMethod===option.codpago}>{option.nombre}
        </button>
      </label>
    );
  });
  return (
    /**
     * This is the group, here it will stack the buttons recived from the
     * options const above here
     */
    <form className="payment-method">
      {options}
    </form>);
}
