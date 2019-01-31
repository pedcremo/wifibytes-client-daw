import React from 'react';
export default function PaymentOptions(props) {
    // console.log("props");
    // console.log(props);
    if(props.paymentOptions.length === 0){
        return (null);
    }
    const options = props.paymentOptions.map((option, i) => {
        return (
            <label key={i}>
                <input type="radio" name="method" key={i} onChange={props.onChange} value={option.codpago} checked={props.paymentMethod === option.codpago}/> {option.nombre}
            </label>
        );
    });
    return (
        <div id="myModal" className="modal" style={{visibility: this.props.modal ? 'visible' : 'hidden' }}>
            <div className="modal-content">
                <form className="payment-method">
                    {options}
                </form>
            </div>
        </div>
    );
  }
