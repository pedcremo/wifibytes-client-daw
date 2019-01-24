import React from 'react'
import * as components from '../childComponents'

let steps = [
    {
        "key": "personal_data",
        "id": 1,
        "active": true,
        "completed": false,
        "title": "Dades Personals",
        "component": <components.Personal />
    },
    {
        "key": "contract",
        "id": 2,
        "active": false,
        "completed": false,
        "title": "Contracte",
        "component": <components.Personal />
    },
    { 
        "key": "confirm",
        "id": 3,
        "active": false,
        "completed": false,
        "title": "Confirmar Pedido",
        "component": <components.Payment />
    }
];

export default steps;