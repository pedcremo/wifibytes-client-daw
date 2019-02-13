import React from 'react';
import { Button } from 'semantic-ui-react'

export function PaymentOptionsRadioButton(props) {
    if (props.paymentOptions.length === 0) {
        return (null);
    }
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
        <form className="payment-method">
            <Button.Group size='large' className="centrar">
                {options}
            </Button.Group>
        </form>);
}
