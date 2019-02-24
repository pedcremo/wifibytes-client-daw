import React from 'react';
import * as components from '../childComponents';
import {Utils} from '../../../utils';
import {translations} from '../../../i18n/translations';

const currentLang = Utils.getUserLang();
const steps = [
  {
    'key': 'personal_data',
    'active': true,
    'completed': false,
    'className': '',
    'title': translations[currentLang]['checkout-personal-data'],
    'component': <components.Personal />,
  },
  {
    'key': 'contract',
    'active': false,
    'completed': false,
    'className': '',
    'title': translations[currentLang]['checkout-contract'],
    'component': <components.Contracts />,
  },
  {
    'key': 'confirm',
    'active': false,
    'completed': false,
    'className': '',
    'title': translations[currentLang]['checkout-confirm'],
    'component': <components.Payment />,
  },
];

export default steps;
