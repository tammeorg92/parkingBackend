'use strict';
const moment = require('moment'),
    Customer = require('./Customer');

module.exports = class PremiumCustomer extends Customer {
    constructor() {
        super();
        this._dayFee = 1;
        this._nightFee = 0.75;
        this._maxTotalSum = 300;
        this._monthlyFee = 20;
    }
};