export let validations = {
    expirationDateIsValid:function(expirationMonth, expirationYear) {
        const today = new Date();
        return ((today.getMonth() + 1) > expirationMonth ? today.getFullYear() < expirationYear : today.getFullYear() <= expirationYear);
    },
    cvvIsValid:function(cvv) {
        return cvv.toString().match(Regex.cvv);
    },
    cardOwnerIsValid:function(cardOwner) {
        return cardOwner.match(Regex.cardOwner);
    },
    cardNumberIsValid:function(cardNumber) {
        let cardNumberProps = cardNumber.toString();
        let cardNumberArray = (cardNumberProps).toString(10).split("").map(t => { return parseInt(t) })
        cardNumberArray = cardNumberArray.map((number, i) => {
            return i % 2 === 0 ? number * 2 : number;
        })
        cardNumberArray = cardNumberArray.map((number, i) => {
            return (i % 2 === 0 && number >= 10) ? number - 9 : number;
        });
        let sum = 0;
        cardNumberArray.map(number => {
            sum += number;
        });
        return sum % 10 === 0;
    }
}