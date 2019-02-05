import {Agent} from '../../src/components/checkout/agent';

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

    let library = {
        fieldsToValidate:[
            {field: "personal_data",
            regexp: /^([0-9a-z]{8})-([0-9a-z]{4})-([0-9a-z]{4})-([0-9a-z]{4})-([0-9a-z]{12})$/},
            {field: "contract",regexp: /^([0-9]{1,})$/}
        ],
        requiredFields:["confirm"]
    };
    
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

});