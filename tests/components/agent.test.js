import {Agent} from '../../src/components/checkout/agent';
import sublibrary
  from '../../src/components/checkout/libraries/subitems_based_library.json';
import library
  from '../../src/components/checkout/libraries/rule_based_library.json';

describe('Testing agent methods', () => {
  const items1 = [
    {id: '0cab50a1-ea99-4aa4-9a49-1983f06a5614'},
    {id: '5'},
    {id: '0cab70a1-ea99-4aa4-9a49-1983f06a5614'},
  ];

  const items2 = [
    {id: '0cab50a1-ea99-4aa4-9a49-1983f06a5614'},
    {id: '0cab70a1-ea99-4aa4-9a49-1983f06a5614'},
  ];

  const subtarifas = [
    {
      id: '0cab50a1-ea99-4aa4-9a49-1983f06a5614',
    },
    {
      id: 5,
      subtarifas: [
        {
          id: 4,
        },
        {
          id: 5,
        },
      ],
    },
    {
      id: 6,
      subtarifas: [
        {
          id: 2,
        },
        {
          id: 4,
        },
        {
          id: 2,
        },
      ],
    },
  ];


  const subtarifas2 = [
    {
      id: 5,
      subtarifas: [
        {
          id: 4,
        },
        {
          id: 5,
        },
      ],
    },
  ];

  const steps = [
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
      title: 'Confirmar Pedido',
    },
  ];

  const steps2 = [
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
      title: 'Confirmar Pedido',
    },
  ];

  const Orderdata = {
    personalData: {
      datosPersonales: {
        'name': 'adfgdsgsdfg',
        'surname': 'lopez',
        'email': 'lopez@gmail.com',
        'date': '1996-02-07',
        'address': 'C/ alicante 1',
        'zip': 46870,
        'city': 'Gandia',
        'cuenta': 'dsfgdsfgd',
        'tipcli': '0',
        'preview': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgACAYAAADoy=',
      },
      datosProductos: [
        {
          'key': 0,
          'tipo': 'alta',
          'tipoTlf': 'fijo',
          'valido': true,
        },
      ],
    },
    contracts: {
      'data': {
        'sign': 'data:image/png;base64,iVBORw0KGgoAAAANSUhE=',
        'pos': 'Position: lat: 38.9138391 long: -0.4219536',
        'time': 'Hour: Thu Feb 14 2019 10:23:47 GMT+0100 ',
        'day': 4,
        'month': 'February',
        'year': 2019,
      },
      'showModal': false,
      'next': true,
      'contractsHTML': 'Documento Legal <p>CONDICIONES GENERALES</p>',
      'subTarifasLength': 3,
      'mounted': false,
    },
    payment: {
      'cardOwner': 'dfgdf df',
      'cardNumber': '2020202020',
      'expirationMonth': 2,
      'expirationYear': 2019,
      'cvv': 414,
    },
  };

  test('objectsToArray -> return the steps depending on the types of items',
      () => {
        const agent1 = Agent.objectsToArray(items1, library);
        expect(agent1).toEqual([
          library.fieldsToValidate[0].field,
          library.fieldsToValidate[1].field,
          library.requiredFields[0],
        ]);

        const agent2 = Agent.objectsToArray(items2, library);
        expect(agent2).toEqual([
          library.fieldsToValidate[0].field,
          library.requiredFields[0],
        ]);

        const AgentError = Agent.objectsToArray();
        expect(AgentError).toThrowError();
      });

  test('filterArray -> check that an object returns depending on the item',
      () => {
        const stepsRates1 = Agent.objectsToArray(items2, library);
        const agent1 = Agent.filterArray(steps, stepsRates1);
        expect(agent1).toEqual(steps2);

        const stepsRates2 = Agent.objectsToArray(items1, library);
        const agent2 = Agent.filterArray(steps, stepsRates2);
        expect(agent2).toEqual(steps);
      });

  test('arrayToQuantityObject -> returns the quantities of each item',
      () => {
        const quantitiesByItems1 = {
          'fibra': 0, 'fijo': 2, 'movil': 0, 'tv': 1, 'wifi': 2,
        };
        const quantity1 = Agent.arrayToQuantityObject(subtarifas, sublibrary);
        expect(quantity1).toEqual(quantitiesByItems1);

        const quantitiesByItems2 = {
          'fibra': 0, 'fijo': 0, 'movil': 0, 'tv': 1, 'wifi': 1,
        };
        const quantity2 = Agent.arrayToQuantityObject(subtarifas2, sublibrary);
        expect(quantity2).toEqual(quantitiesByItems2);

        const AgentError = Agent.arrayToQuantityObject();
        expect(AgentError).toThrowError();
      });

  test('ObjectSendToOrder -> check that returns the correct data', () => {
    const objectOrder = Agent.objectSendToOrder(Orderdata, steps);
    expect(objectOrder).not.toBeNull();

    const AgentError = Agent.objectSendToOrder();
    expect(AgentError).toThrowError();
  });
});
