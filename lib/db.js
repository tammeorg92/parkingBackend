const loki = require('lokijs');

const db = new loki('parking.db');
const parking = db.addCollection('parking', { unique: 'uniqueIndex' });



exports.customerData = (name) => {
    return parking.find({ name});
}


exports.insertData = (parkingData) => {
    parkingData.forEach((values) => {
        try {
            values.uniqueIndex = `${values.name}${values.startTime}${values.parkingHouse}`
            parking.insert(values);
        } catch (err) {
            console.error(err.message);
        }
    })
    return true;

}


const mockData = 
	 [
        {"name":"Customer_1", "parkingHouse":"Center", "startTime":"2018-05-01 02:05" , "endTime":"2018-05-01 09:12" },
		{"name":"Customer_1", "parkingHouse":"Center", "startTime":"2018-05-05 05:44" , "endTime":"2018-05-05 09:12" },
        {"name":"Customer_1", "parkingHouse":"Center", "startTime":"2018-05-07 02:05" , "endTime":"2018-05-07 02:15" },

        {"name":"Customer_2", "parkingHouse":"Center", "startTime":"2018-05-05 13:13" , "endTime":"2018-05-05 20:13" },


        {"name":"Customer_5", "parkingHouse":"Center", "startTime":"2018-05-08 13:44" , "endTime":"2018-05-08 16:30" },
		{"name":"Customer_5", "parkingHouse":"Center", "startTime":"2018-05-05 22:13" , "endTime":"2018-05-06 09:13" },
		{"name":"Customer_5", "parkingHouse":"Center", "startTime":"2018-05-01 05:02" , "endTime":"2018-05-03 09:13" },
        {"name":"Customer_5", "parkingHouse":"Center", "startTime":"2018-05-08 06:13" , "endTime":"2018-05-09 22:13" },
		{"name":"Customer_5", "parkingHouse":"Center", "startTime":"2018-05-10 05:02" , "endTime":"2018-05-15 09:13" }

    ];

this.insertData(mockData);
