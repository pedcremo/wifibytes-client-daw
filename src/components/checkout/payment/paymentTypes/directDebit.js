import React from 'react';
import {Utils} from "../../../../utils";

export default function DirectDebitForm(props) {
    const cardOwner = props.cardOwner;
    const cardNumber = props.cardNumber;
    const expirationMonth = props.expirationMonth;
    const expirationYear = props.expirationYear;
    const cvv = props.cvv;
    return (
        <form onSubmit={props.submitForm}>
          <fieldset>
            <fieldset className="form-group">
              <label>{Utils.translate("payment-owner")}</label>
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder={Utils.translate("payment-owner")}
                value={cardOwner}
                onChange={props.changeCardOwner} />
            </fieldset>
            <fieldset className="form-group">
              <label>{Utils.translate("payment-numberCard")}</label>
              <input
                className="form-control form-control-lg"
                type="number"
                placeholder={Utils.translate("payment-numberCard")}
                value={cardNumber}
                onChange={props.changeCardNumber} />
            </fieldset>
            <fieldset className="form-group">
              <label>{Utils.translate("payment-expirationMonth")}</label>
              <select
              className="form-control form-control-lg"
              value={expirationMonth}
              onChange={props.changeExpirationMonth}>
                <option value={1}>01</option>
                <option value={2}>02</option>
                <option value={3}>03</option>
                <option value={4}>04</option>
                <option value={5}>05</option>
                <option value={6}>06</option>
                <option value={7}>07</option>
                <option value={8}>08</option>
                <option value={9}>09</option>
                <option value={10}>10</option>
                <option value={11}>11</option>
                <option value={12}>12</option>
              </select>
            </fieldset>
            <fieldset className="form-group">
              <label>{Utils.translate("payment-expirationYear")}</label>
              <select
              className="form-control form-control-lg"
              value={expirationYear}
              onChange={props.changeExpirationYear}>
                <option value={2018}>2018</option>
                <option value={2019}>2019</option>
                <option value={2020}>2020</option>
                <option value={2021}>2021</option>
                <option value={2022}>2022</option>
              </select>
            </fieldset>
            <fieldset className="form-group">
              <label>{Utils.translate("CVV")}</label>
              <input
                className="form-control form-control-lg"
                type="number"
                placeholder={Utils.translate("CVV")}
                value={cvv}
                onChange={props.changeCvv} />
            </fieldset>
            <button
              className="btn btn-lg btn-primary pull-xs-right"
              type="submit"
              disabled={props.disabled}>
              Comprar
            </button>
          </fieldset>
        </form>);
  }


// import React from 'react';
// import {Utils} from "../../../../utils";

// export default function directDebitForm(props) {
//     const cardOwner = props.cardOwner;
//     const cardNumber = props.cardNumber;

//     return (
//         <form onSubmit={props.submitForm}>
//           <fieldset>
//             <fieldset className="form-group">
//               <label>Dueño de la cuenta</label>
//               <input
//                 className="form-control form-control-lg"
//                 type="text"
//                 placeholder={Utils.translate("payment-owner")}
//                 //value={cardOwner}
//                 /*onChange={props.changeCardOwner}*/ />
//             </fieldset>
//             <fieldset className="form-group">
//               <label>IBAN</label>
//               <input
//                 className="form-control form-control-lg"
//                 type="number"
//                 placeholder={Utils.translate("payment-numberCard")}
//                 value={cardNumber}
//                 onChange={props.changeCardNumber} />
//             </fieldset>
//             <button
//               className="btn btn-lg btn-primary pull-xs-right"
//               type="submit"
//               /*disabled={props.disabled}*/>
//               Comprar
//             </button>
//           </fieldset>
//         </form>);
//   }