import { Step } from "semantic-ui-react";

/** @module Agent */

export const Agent = {

    getSteps: function (item = []) {
        var stepsProd = [], res;
        var validation = {
            patternProd: /^([0-9a-z]{8})-([0-9a-z]{4})-([0-9a-z]{4})-([0-9a-z]{4})-([0-9a-z]{12})$/,
            patternTarifa: /^([0-9]{1,})$/,
            stepsProducts: ["personal information", "payment"],
            stepsRates: ["personal information", "contract", "payment"]
        };

        var isItemValidated = function isItemValidated(validation, item) {
            item.map(it => {
                validation.patternProd.test(it) ? stepsProd.push(...validation.stepsProducts) : false ||
                    validation.patternTarifa.test(it) ? stepsProd.push(...validation.stepsRates) : false ||
                        it ? [] : console.error("Error, item not found");
            });

            res = [...new Set(stepsProd)];
            return res;
        };

        //console.log("VAL",isItemValidated(validation,item));
        return isItemValidated(validation, item);
    },

};