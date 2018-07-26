# Parking backend

## Prerequisite
Node.js version: 8.x or later

## Starting application
* Install packages: npm install 
* Start server: npm start
* Tests: npm test


## Data import
Data import is implemented using HTTP POST request:

API location: 
* http://<api_server>:8080/parking/data

POST body values:
   * "name": customer name 
   * "parkingHouse": parking house name
   * "startTime": start of parking (YYYY-MM-DD HH:mm)
   * "endTime": end of parking (YYYY-MM-DD HH:mm)

### Example JSON: 
	 [
        {"name":"Customer_1", "parkingHouse":"Center", "startTime":"2018-05-20 02:05" , "endTime":"2018-05-20 07:12" },
		{"name":"Customer_2", "parkingHouse":"Center", "startTime":"2018-05-25 18:40" , "endTime":"2018-05-25 20:35" }
     ]
### Example using curl: 
curl -d '[
        {"name":"Customer_1", "parkingHouse":"Center", "startTime":"2018-05-20 02:05" , "endTime":"2018-05-20 07:12" },
		{"name":"Customer_2", "parkingHouse":"Center", "startTime":"2018-05-25 18:40" , "endTime":"2018-05-25 20:35" }]' -H "Content-Type: application/json" -X POST http:/localhost:8080/parking/data
