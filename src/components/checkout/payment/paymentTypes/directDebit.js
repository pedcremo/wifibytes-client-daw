import React from 'react';
import {Utils} from "../../../../utils";

export default function DirectDebitForm(props) {
    const debitOwner = props.debitOwner;
    const iban = props.iban;
    const address = props.address;

    return (
        <form onSubmit={props.submitForm}>
          <fieldset>
            <fieldset className="form-group">
              <label>{Utils.translate("payment-owner-debit")}</label>
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder={Utils.translate("payment-owner-debit")}
                value={debitOwner}
                onChange={props.changeDebitOwner} />
            </fieldset>
            <fieldset className="form-group">
              <label>{Utils.translate("payment-address-debit")}</label>
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder={Utils.translate("payment-address2-debit")}
                value={address}
                onChange={props.changeAddress} />
            </fieldset>
            <fieldset className="form-group">
              <label>{Utils.translate("payment-iban-debit")}</label>
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder={Utils.translate("payment-iban2-debit")}
                pattern="^ES\d{22}$"
                value={iban}
                onChange={props.changeIban} />
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