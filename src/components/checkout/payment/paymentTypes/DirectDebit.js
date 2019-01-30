import React from 'react';
import {Utils} from "../../../../utils";
import {RegExps} from '../../../../regExps';

export default function DirectDebitForm(props) {

  function validateDirectDebit(){ 
  /**
  *VALIDATE ALL NECESARI IN DIRECT DEBIT 
  */
    return props.iban.match(RegExps.iban) && props.address && props.debitOwner && validateIBAN();
  }
  function validateIBAN() {
    /**
     * FUNCTION NEDDED IN IBAN VALIDATION
     */
      let IBAN = props.iban.toUpperCase();
      IBAN = IBAN.replace(/\s/g, ""); 
      
      let letra1,letra2,num1,num2,isbanaux;

      if (IBAN.length != 24)
          return false;

      letra1 = IBAN.substring(0, 1); 
      letra2 = IBAN.substring(1, 2);
      num1 = getnumIBAN(letra1); 
      num2 = getnumIBAN(letra2);
      isbanaux = String(num1) + String(num2) + IBAN.substring(2);
      isbanaux = isbanaux.substring(6) + isbanaux.substring(0,6);

      /**
       * CALCULATE THE REST
       */
      return modulo97(isbanaux) === 1? true:false;
  }
  function modulo97(iban) { 
    /**
     * FUNCTION NEDDED IN IBAN VALIDATION
     */
      let remainer = "";
      for (let i = 1; i <= Math.ceil(iban.length/7); i++) {
          remainer = String(parseFloat(remainer+iban.substr((i-1)*7, 7))%97);
      }
      return parseInt(remainer);
  }
  function getnumIBAN(letra) {
    /**
     * FUNCTION NEDDED IN IBAN VALIDATION
     */
      let ls_letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      return ls_letras.search(letra) + 10;
  }
    const debitOwner = props.debitOwner;
    const iban = props.iban;
    const address = props.address;

    return (
        <form onSubmit={props.submitForm()}>
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
              disabled={!validateDirectDebit()}>
              Comprar
            </button>
          </fieldset>
        </form>);
  }