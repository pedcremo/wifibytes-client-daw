/** @module Agent */

let Agent = {

    getSteps: function (item = []) {
        var itemsProd = [], itemsTarifas = [],stepsProd = [];
        let regTarifa = /^([0-9]{1})$/;
        let regProd = /^([0-9a-z]{8})-([0-9a-z]{4})-([0-9a-z]{4})-([0-9a-z]{4})-([0-9a-z]{12})$/;
        
        item.map(it => {
            regProd.test(it) ? itemsProd.push(it) : false || 
            regTarifa.test(it) ? itemsTarifas.push(it) : false ||
            it ? [] : console.error("Error, item not found");
        });
        
        console.log("PROD",itemsProd, "TAR",itemsTarifas);

        if(itemsProd.length > 0){
            stepsProd.push(
                {"Prod":
                    [{
                        "count":itemsProd.length,
                        "steps":["personal information","product","payment"]
                    }]
                }
            )
        }
        if(itemsTarifas.length > 0){
            stepsProd.push(
                {"Tarifas":
                    [{
                        "count":itemsTarifas.length,
                        "steps":["personal information","contract","payment"]
                    }]
                }
            )
        }
        if(itemsTarifas.length > 0 && itemsProd.length > 0){
            let countTotal = itemsProd.length + itemsTarifas.length;
            stepsProd = [];
            stepsProd.push(
                {"both":
                    [{
                        "count":countTotal,
                        "steps":["personal information","contract","product","payment"]
                    }]
                }
            )
        }
        return stepsProd;
    },

};

export { Agent };