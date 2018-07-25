const RegularCustomer = require('./RegularCustomer'),
    PremiumCustomer = require('./PremiumCustomer'),
    db = require('./db');


exports.customerData = (name, month, type) => {
    try {
        let data = db.customerData(name);
        let customer = null;
        let parkingData = [];
        if (!data) return null;

        if (type === 'regular') {
            customer = new RegularCustomer()
        }
        else if (type === 'premium') {
            customer = new PremiumCustomer();
        }
        else {
            console.error('invalid customer type');
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
        //Use logger here
        console.error(err.message);
        return { err: true, message: 'interal error' };
    }

}


const findCustomer = (name) => {
}