import Catalog from '../../src/components/catalog/catalog';
import React from 'react';
import ReactDOM from 'react-dom';

const $ = require('jquery');

beforeEach(() => {
    // Set up our document body
    document.body.innerHTML =
        `<div id="main" class="container-fluid pl-0 pr-0">
        </div>`;
});

it('We can check if Catalog component called the class constructor', () => {
    const catalogs = ReactDOM.render(<Catalog />, document.getElementById("main"));
    expect(catalogs.constructor.name).toBe('Catalog');
});

it('Catalog render must be called and it works properly', () => {
    const catalogs = ReactDOM.render(<Catalog />, document.getElementById("main"));
    expect($('#main').children.length).toBeGreaterThan(1);
});