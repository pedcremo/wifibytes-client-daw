import React from 'react'
import * as components from '../childComponents'
import {Utils} from '../../../utils';
import {translations} from '../../../i18n/translations';
let currentLang = Utils.getUserLang();
let steps = [
    {
        "key": "personal_data",
        "id": 1,
        "active": true,
        "completed": false,
        "title": translations[currentLang]["checkout-personal-data"],
        "component": <components.Personal />
    },
    {
        "key": "contract",
        "id": 2,
        "active": false,
        "completed": false,
        "title": translations[currentLang]["checkout-contract"],
        "component": <components.Payment />
    },
    { 
        "key": "confirm",
        "id": 3,
        "active": false,
        "completed": false,
        "title": translations[currentLang]["checkout-confirm"],
        "component": <components.Payment />
    }
];

export default steps;