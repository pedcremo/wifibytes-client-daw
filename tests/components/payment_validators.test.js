import {validations} from '../../src/validators/paymentFormValidators';

it('Validate if expiration date is valid', () => {
    expect(validations.expirationDateIsValid('02', '2022')).toBe(true);
});

it('Validate if expiration date is false', () => {
    expect(validations.expirationDateIsValid('02', '2018')).toBe(false);
}); 
    
it('Validate if cvv is valid', () => {
    expect(validations.cvvIsValid('123')).toBe(true);
});

it('Validate if cvv is false', () => {
    expect(validations.cvvIsValid('121113')).toBe(false);
});

it('Validate if Card Owner is valid', () => {
    expect(validations.cardOwnerIsValid('nombre prueba')).toBe(true);
});

it('Validate if Card Owner is false', () => {
    expect(validations.cardOwnerIsValid('sa16sa1551')).toBe(false);
});

it('Validate if Card Number is false', () => {
    expect(validations.cardNumberIsValid('4360846875643654')).toBe(true);
});

it('Validate if Card Number is false', () => {
    expect(validations.cardNumberIsValid('sa16sa1551')).toBe(false);
});