import React from 'react';
import { Button } from 'semantic-ui-react'

export function PaymentOptionsRadioButton(props) {
    const screen = window.innerWidth > 992;
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
        /** There is a bug with width buttons and this fixes it */
        const width = {
            width: '130px',
        };
        return (
            <label key={i}>
                {screen ? <Button.Group size='large' className="centrar">
                    {i != 0 ? <Button.Or /> : ""}
                    <Button onClick={props.changePaymentMethod()} style={width} value={option.codpago} positive={props.paymentMethod === option.codpago}>{option.nombre}</Button>
                </Button.Group> :
                    <Button.Group size='large' className="centrar" vertical>
                        {i != 0 ? <Button.Or /> : ""}
                        <Button onClick={props.changePaymentMethod()} style={width} value={option.codpago} positive={props.paymentMethod === option.codpago}>{option.nombre}</Button>
                    </Button.Group>}
            </label>
        );
    });
    return (
        /**
         * This is the group, here it will stack the buttons recived from the options
         * const above here
         */
        <form className="payment-method">
            {screen ? <Button.Group size='large' className="centrar">
                {options}
            </Button.Group> :
                <Button.Group size='large' className="centrar" vertical>
                    {options}
                </Button.Group>}

        </form>);
}
