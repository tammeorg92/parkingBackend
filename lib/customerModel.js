'use strict';
const RegularCustomer = require('./RegularCustomer'),
    PremiumCustomer = require('./PremiumCustomer'),
    db = require('./db'),
    logger = require('../config/logger');


exports.customerData = (name,  type) => {
    try {
        let data = db.customerData(name);
        let customer = null;
        let parkingData = [];
        if (data.length === 0) return null;

        if (type === 'regular') {
            customer = new RegularCustomer()
        }
        else if (type === 'premium') {
            customer = new PremiumCustomer();
        }
        else {
            logger.error(`invalid customer type:  ${type}`);
            return { err: true, message: 'invalid customer type' }
        }
        parkingData = data.map((values) =>
            customer.getParkingDetails(values));

        const total = customer.getTotal(parkingData);
        return {
            data: parkingData,
            dayFee:customer.dayFee,
            nightFee:customer.nightFee,
            maxInvoice:customer.maxTotalSum,
            monthlyFee:customer.monthlyFee,
            total
        }
    } catch (err) {
        logger.error(err.message);
        return { err: true, message: 'interal error' };
    }

}
