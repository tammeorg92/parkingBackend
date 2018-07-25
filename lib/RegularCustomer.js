'use strict';
const moment = require('moment'),
    Customer = require('./Customer');

module.exports = class RegularCustomer extends Customer {
    constructor() {
        super();
        this._dayFee = 1.5;
        this._nightFee = 1;
    }
};