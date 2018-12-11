import Families from '../../src/components/catalog/families';
import React from 'react';
import ReactDOM from 'react-dom';

const $ = require('jquery');

beforeEach(() => {
    // Set up our document body
    document.body.innerHTML =
        `<div id="main" class="container-fluid pl-0 pr-0">
        </div>`;
});

it('We can check if Families component called the class constructor', () => {
    const families = ReactDOM.render(<Families />, document.getElementById("main"));
    expect(families.constructor.name).toBe('Families');
});

it('Families render must be called and it works properly', () => {
    const families = ReactDOM.render(<Families />, document.getElementById("main"));
    expect($('#main').children.length).toBeGreaterThan(1);
});