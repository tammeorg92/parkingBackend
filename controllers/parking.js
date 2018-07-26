'use strict';
const express = require('express'),
    router = express.Router(),
    db = require('../lib/db');


router.post('/data', async (req,res) => { 
    db.insertData(req.body);
    res.status(200).json();
})


module.exports = router