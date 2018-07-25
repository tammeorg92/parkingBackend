const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    customer = require('./controllers/customer'),
    parking = require('./controllers/parking');


const PORT = 8080;


//Middleware
app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/customer', customer);
app.use('/parking', parking);

/************************Default page  **********************************/
app.get('/', (req, res) => {
    res.send('Hello Better World!')
})

app.listen(PORT, () => {
    console.log(`Local server started on port ${PORT}`);
    return true;
})
