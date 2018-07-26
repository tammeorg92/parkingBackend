'use strict';
const loki = require('lokijs'),
    logger= require('../config/logger');

const db = new loki('parking.db');
const parking = db.addCollection('parking', { unique: 'uniqueIndex' });



exports.customerData = (name) => {
    return parking.find({ name});
}


exports.insertData = (parkingData) => {
    logger.info('Importing new customer data')
    parkingData.forEach((values) => {
        try {
            values.uniqueIndex = `${values.name}${values.startTime}${values.parkingHouse}`
            parking.insert(values);
        } catch (err) {
            logger.error(err.message);
        }
    })
    return true;

}


const mockData = 
	 [
        {"name":"Customer_1", "parkingHouse":"Center", "startTime":"2018-05-01 02:05" , "endTime":"2018-05-01 09:12" },
		{"name":"Customer_1", "parkingHouse":"Center", "startTime":"2018-05-05 19:40" , "endTime":"2018-05-05 20:35" },
        {"name":"Customer_1", "parkingHouse":"Center", "startTime":"2018-05-07 08:12" , "endTime":"2018-05-07 10:45" },

        {"name":"Customer_2", "parkingHouse":"Center", "startTime":"2018-05-05 08:12" , "endTime":"2018-05-05 10:45" },
        {"name":"Customer_2", "parkingHouse":"Center", "startTime":"2018-05-08 07:02" , "endTime":"2018-05-08 11:56" },
        {"name":"Customer_2", "parkingHouse":"Center", "startTime":"2018-05-11 22:10" , "endTime":"2018-05-11 22:35" },
        {"name":"Customer_2", "parkingHouse":"Center", "startTime":"2018-05-13 19:40" , "endTime":"2018-05-13 20:35" },


        {"name":"Customer_5", "parkingHouse":"Center", "startTime":"2018-05-08 13:44" , "endTime":"2018-05-08 16:30" },
		{"name":"Customer_5", "parkingHouse":"Center", "startTime":"2018-05-05 22:13" , "endTime":"2018-05-06 09:13" },
		{"name":"Customer_5", "parkingHouse":"Center", "startTime":"2018-05-01 05:02" , "endTime":"2018-05-03 09:13" },
        {"name":"Customer_5", "parkingHouse":"Center", "startTime":"2018-05-08 06:13" , "endTime":"2018-05-09 22:13" },
		{"name":"Customer_5", "parkingHouse":"Center", "startTime":"2018-05-10 05:02" , "endTime":"2018-05-15 09:13" }

    ];

this.insertData(mockData);
