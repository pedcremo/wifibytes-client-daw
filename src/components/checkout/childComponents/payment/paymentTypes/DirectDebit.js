import React from 'react';
import {RegExps} from '../../../../../regExps';

export default function DirectDebitForm(props) {
  const number = props.number;
  props=props.form;
  function validateDirectDebit(){ 
  /**
  *VALIDATE ALL NECESARI IN DIRECT DEBIT 
  */
    return props.address && props.debitOwner && validateIBAN();
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
      const firstValidation = modulo97(isbanaux) === 1? true:false;
      return firstValidation && IBAN.match(RegExps.iban);
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
          <fieldset>
            <h1>{props.translate.t("payment-method0")}</h1>
            <fieldset className="form-group">
            <h3 className="errors"
              hidden={!props.submittedAtLeastOnce || debitOwner}>
              Something is wrong with this field, check it out!</h3>
              <label>{props.translate.t("payment-owner-debit")}</label>
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder={props.translate.t("payment-owner-debit")}
                value={debitOwner}
                onChange={props.changeAnyFormField(number, "debitOwner")} />
            </fieldset>
            <fieldset className="form-group">
            <h3 className="errors"
              hidden={!props.submittedAtLeastOnce || address}>
              Something is wrong with this field, check it out!</h3>
              <label>{props.translate.t("payment-address-debit")}</label>
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder={props.translate.t("payment-address2-debit")}
                value={address}
                onChange={props.changeAnyFormField(number, "address")} />
            </fieldset>
            <fieldset className="form-group">
            <h3 className="errors"
              hidden={!props.submittedAtLeastOnce || validateIBAN()}>
              Something is wrong with this field, check it out!</h3>
              <label>{props.translate.t("payment-iban-debit")}</label>
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder={props.translate.t("payment-iban2-debit")}
                pattern="^ES\d{22}$"
                value={iban}
                onChange={props.changeAnyFormField(number, "iban")} />
            </fieldset>
            {props.addDeletePaymentMethodButton(number)}
          </fieldset>);
  }