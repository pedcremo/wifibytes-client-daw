import {Agent} from '../../src/components/checkout/agent';
import sublibrary from "../../src/components/checkout/libraries/subitems_based_library.json";
import library from "../../src/components/checkout/libraries/rule_based_library.json";

describe("Testing agent methods",() => {
    let items1 = [
        {id: "0cab50a1-ea99-4aa4-9a49-1983f06a5614"},
        {id: "5"},
        {id: "0cab70a1-ea99-4aa4-9a49-1983f06a5614"}
    ];

    let items2 = [
        {id: "0cab50a1-ea99-4aa4-9a49-1983f06a5614"},
        {id: "0cab70a1-ea99-4aa4-9a49-1983f06a5614"}
    ];

    let subtarifas = [
        {
            id: "0cab50a1-ea99-4aa4-9a49-1983f06a5614"
        },
        {
            id: 5,
            subtarifas: [
                {
                    id: 4
                },
                {
                    id: 5
                }
            ]
        },
        {
            id: 6,
            subtarifas: [
                {
                    id: 2
                },
                {
                    id: 4
                },
                {
                    id: 2
                }
            ]
        }
    ]

    let subtarifas2 = [
        {
            id: 5,
            subtarifas: [
                {
                    id: 4
                },
                {
                    id: 5
                }
            ]
        }
    ]

    let steps = [
        {
            key: 'personal_data',
            active: true,
            completed: false,
            title: 'Dades Personals',
        },
        {
            key: 'contract',
            active: false,
            completed: false,
            title: 'Contracte',
        },
        { 
            key: 'confirm',
            active: false,
            completed: false,
            title: 'Confirmar Pedido' 
        },
    ]

    let steps2 = [
        {
            key: 'personal_data',
            active: true,
            completed: false,
            title: 'Dades Personals',
        },
        { 
            key: 'confirm',
            active: false,
            completed: false,
            title: 'Confirmar Pedido' 
        },
    ]
    test("objectsToArray -> check return the steps depending on the types of items", () => {

        let agent1 = Agent.objectsToArray(items1,library);
        expect(agent1).toEqual([
            library.fieldsToValidate[0].field, 
            library.fieldsToValidate[1].field, 
            library.requiredFields[0]
        ]);

        let agent2 = Agent.objectsToArray(items2,library);
        expect(agent2).toEqual([
            library.fieldsToValidate[0].field,
            library.requiredFields[0]
        ]);
    });

    test("filterArray -> check that an object returns depending on the item", () => {
        
        let stepsRates1 = Agent.objectsToArray(items2,library);
        let agent1 = Agent.filterArray(steps,stepsRates1)
        expect(agent1).toEqual(steps2);

        let stepsRates2 = Agent.objectsToArray(items1,library);
        let agent2 = Agent.filterArray(steps,stepsRates2)
        expect(agent2).toEqual(steps);
        
    });

    test("arrayToQuantityObject -> check that returns the quantities of each item", () => {
        let quantitiesByItems1 = {"fibra": 0, "fijo": 2, "movil": 0, "tv": 1, "wifi": 2}
        let quantity1 = Agent.arrayToQuantityObject(subtarifas,sublibrary);
        expect(quantity1).toEqual(quantitiesByItems1);

        let quantitiesByItems2 = {"fibra": 0, "fijo": 0, "movil": 0, "tv": 1, "wifi": 1}
        let quantity2 = Agent.arrayToQuantityObject(subtarifas2,sublibrary);
        expect(quantity2).toEqual(quantitiesByItems2);
        
    });

});