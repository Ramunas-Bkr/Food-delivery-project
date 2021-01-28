'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const tabs = require('./modules/tabs');
    const timer = require('./modules/timer');
    const modal = require('./modules/modal');
    const cards = require('./modules/cards');
    const post = require('./modules/post');
    const slider = require('./modules/slider');
    const calculator = require('./modules/calculator');

    tabs();
    timer();
    modal();
    cards();
    post();
    slider();
    calculator();

});

