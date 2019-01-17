/** @module Agent */

export default Agent = {

    getSteps: function (item = []) {
        var itemsProd = [], itemsTarifas = [], stepsProd = {};
        let regTarifa = /^([0-9]{1,})$/;
        let regProd = /^([0-9a-z]{8})-([0-9a-z]{4})-([0-9a-z]{4})-([0-9a-z]{4})-([0-9a-z]{12})$/;

        item.map(it => {
            regProd.test(it) ? itemsProd.push(it) : false ||
                regTarifa.test(it) ? itemsTarifas.push(it) : false ||
                    it ? [] : console.error("Error, item not found");
        });

        if (itemsProd.length > 0) stepsProd = {"productos":{"steps": ["personal information", "payment"]}}
        
        if (itemsTarifas.length > 0) {
            stepsProd = {"tarifas":{"steps": ["personal information", "contract", "payment"]}}
        }
        if (itemsTarifas.length > 0 && itemsProd.length > 0) {
            stepsProd = {"general":{"steps": ["personal information", "contract", "payment"]}}
        }
        return stepsProd;
    },

};