import React from 'react';
import { Button } from 'semantic-ui-react'

export function PaymentOptionsRadioButton(props) {
    /**
     * If server don't return payment options we return null
     */
    if (props.paymentOptions.length === 0) {
        return (null);
    }
    /**
     * This function it return the button for each payment method recived from the server
     */
    const options = props.paymentOptions.map((option, i) => {
        return (
            <label key={i}>
                <Button.Group size='large' className="centrar">
                    {i != 0 ? <Button.Or /> : ""}
                    <Button onClick={props.changePaymentMethod()} value={option.codpago} positive={props.paymentMethod === option.codpago}>{option.nombre}</Button>
                </Button.Group>
            </label>
        );
    });
    return (
        /**
         * This is the group, here it will stack the buttons recived from the options
         * const above here
         */
        <form className="payment-method">
            <Button.Group size='large' className="centrar">
                {options}
            </Button.Group>
        </form>);
}
