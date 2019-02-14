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

    let Orderdata = { 
        personalData: {
            datosPersonales: {
                "name": "adfgdsgsdfg",
                "surname": "lopez",
                "email": "lopez@gmail.com",
                "date": "1996-02-07",
                "address": "C/ alicante 1",
                "zip": 46870,
                "city": "Gandia",
                "cuenta": "dsfgdsfgd",
                "tipcli": "0",
                "preview": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAxoAAARjCAYAAADoylLVAAAACXBIWXMAAA7EAATDSIiIiIiMjkmGgQEREREZHJMdEgIiIiIiKTY6JBREREREQmx0SDiIiIiIhMjokGERERERGZHBMNIiIiIiIyOSYaRERERERkckw0iIiIiIjI5JhoEBERERGRyTHRICIiIiIik2OiQUREREREJsdEg4iIiIiITI6JBhERERERmRwTDSIiIiIiMjkmGkREREREZHJMNIiIiIiIyOSYaBARERERkckx0SAiIiIiIpNjokFERERERCbHRIOIiIiIiEyOiQYREREREZkcEw0iIiIiIjI5JhpERERERGRyTDSIiIiIiMjkmGgQEREREZHJMdEgIiIiIiKTY6JBREREREQmx0SDiIiIiIhMjokGERERERGZHBMNIiIiIiIyOSYaRERERERkckw0iIiIiIjI5JhoEBERERGRyTHRICIiIiIik2OiQUREREREJsdEg4iIiIiITI6JBhERERERmRwTDSIiIiIiMjkmGkREREREZHJMNIiIiIiIyOSYaBARERERkckx0SAiIiIiIpNjokFERERERCbHRIOIiIiIyErodHqcOpqNglwVAECr1SM1qQQ5mRWix2Ir+hWJiIiIiKhD7N+RDp1Gjy6x3gCAnX8no0qlha2dHH6Brug+CiA8L3JkZjpEZXNjcmlwdGlvbj4KPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KPD94cGFja2V0IGVuZD0ncic/PjG4PMIAAAAASUVORK5CYII="
            },
            datosProductos: [
                {
                  "key": 0,
                  "tipo": "alta",
                  "tipoTlf": "fijo",
                  "valido": true
                }
            ]
        },
        contracts: {
            "data": {
              "sign": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAD6CAYAAABXq7VOAAAGd0lEQVR4nO3dW6jlVR3A8W+EGfgg0e3FoEyql7AbBQWVEZVR2Q2SyuxC2Q2KQDKMboRFUXSVrlhpdqGgktRIupFWSHmLyNRMJzMVdUydGXNm6uG3D6nlzNmnaY/G5wN/zmGzzz5r7Zf1W7/DcNf0TgRdxUfLs+kIAAAAASUVORK5CYII=",
              "pos": "Position: lat: 38.9138391 long: -0.4219536",
              "time": "Hour: Thu Feb 14 2019 10:23:47 GMT+0100 (hora estándar de Europa central)",
              "day": 4,
              "month": "February",
              "year": 2019
            },
            "showModal": false,
            "next": true,
            "contractsHTML": "Documento Legal 2  <p>CONDICIONES GENERALES DE LOS SERVICIOS <br />              DE TV Y DE COMUNICACIONES ELECTRÓNICAS           </p>",
            "subTarifasLength": 3,
            "mounted": false
        },
        payment: {
            "cardOwner": "dfgdf df",
            "cardNumber": "2020202020",
            "expirationMonth": 2,
            "expirationYear": 2019,
            "cvv": 414
        }
    }

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

    test("ObjectSendToOrder -> check that returns the correct data", () => {
        let objectOrder = Agent.ObjectSendToOrder(Orderdata,steps);
        expect(objectOrder).not.toBeNull();
        
    });

});