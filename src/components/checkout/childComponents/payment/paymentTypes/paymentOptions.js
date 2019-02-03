import React from 'react';
export function PaymentOptions(props) {
    const closeModal = props.closeModal;
    if(props.paymentOptions.length === 0){
        return null;
    }

    const buttonOptions = props.paymentOptions.map((option, i) => {
        return (
            <button key={i} onClick={()=>closeModal(option.codpago)} value={option.codpago}> {option.nombre}</button>
        );
    });
    return (
        <div id="myModal" className="modal" style={{visibility:props.show? "visible": "hidden"}}>
            <div className="modal-content">
            <span className="close" onClick={()=>closeModal()}>&times;</span>
            <div>
                <div>
                    <h2>Seleccione qué opción de pago quieres añadir</h2>
                    <div className="selectionButtons">
                        {buttonOptions}
                    </div>
                </div>
            </div>         
            </div>
        </div>
    );
  }

  export function PaymentOptionsRadioButton(props) {
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
        <form className="payment-method">
            {options}
        </form>);
  }
