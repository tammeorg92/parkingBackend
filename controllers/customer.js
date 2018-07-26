'use strict';
const express = require('express'),
    router = express.Router(),
    model = require('../lib/customerModel');


router.get('/:customerName', async (req, res) => {
    if (!req.query.type) { 
        return res.status(500).json({ message:'customer type missing'});
    }
    const result = model.customerData(
        req.params.customerName,
        req.query.type
    );
    if (result === null) {
        return res.status(404).json({ data: {} });
    }
    else if  (!result.err) {
        return res.status(200).json({ data: result });
    }
    else {
        return res.status(500).json({ message:result.message});
    }
})


module.exports = router