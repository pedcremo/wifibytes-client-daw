import {Validations} from '../../src/validators/paymentFormValidators';

it('Validate if expiration date is valid', () => {
    expect(Validations.expirationDateIsValid('02', '2022')).toBe(true);
});

it('Validate if expiration date is false', () => {
    expect(Validations.expirationDateIsValid('02', '2018')).toBe(false);
}); 
    
it('Validate if cvv is valid', () => {
    expect(Validations.cvvIsValid('123')).toBe(true);
});

it('Validate if cvv is false', () => {
    expect(Validations.cvvIsValid('121113')).toBe(false);
});

it('Validate if Card Owner is valid', () => {
    expect(Validations.cardOwnerIsValid('nombre prueba')).toBe(true);
});

it('Validate if Card Owner is false', () => {
    expect(Validations.cardOwnerIsValid('sa16sa1551')).toBe(false);
});

it('Validate if Card Number is false', () => {
    expect(Validations.cardNumberIsValid('4360846875643654')).toBe(true);
});

it('Validate if Card Number is false', () => {
    expect(Validations.cardNumberIsValid('sa16sa1551')).toBe(false);
});