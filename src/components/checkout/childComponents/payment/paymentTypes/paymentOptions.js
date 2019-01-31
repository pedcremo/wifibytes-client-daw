import React from 'react';
export default function PaymentOptions(props) {
    function closeModal(){
        document.getElementById("myModal").style.visibility = "hidden";
    }
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
    const buttonOptions = props.paymentOptions.map((option, i) => {
        return (
            <button key={i} onClick={()=>closeModal()} value={option.codpago}> {option.nombre}</button>
        );
    });
    return (
        <div id="myModal" className="modal" style={{visibility:'visible'}}>
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
