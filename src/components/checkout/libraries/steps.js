import React from 'react'
import * as components from '../childComponents'
import {Utils} from '../../../utils';
import {translations} from '../../../i18n/translations';

let currentLang = Utils.getUserLang();
let steps = [
    {
        "key": "personal_data",
        "active": true,
        "completed": true,
        "className": "",
        "title": translations[currentLang]["checkout-personal-data"],
        "component": <components.Personal />
    },
    {
        "key": "contract",
        "active": false,
        "completed": false,
        "className": "",
        "title": translations[currentLang]["checkout-contract"],
        "component": <components.Contracts />
    },
    { 
        "key": "confirm",
        "active": false,
        "completed": false,
        "className": "",
        "title": translations[currentLang]["checkout-confirm"],
        "component": <components.Payment />
    }
];

export default steps;