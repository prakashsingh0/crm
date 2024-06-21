const express = require('express');
const { addCustomer, getCustomers, pushToCRM, pushToCRMByOne } = require('../controllers/customerController');
const router = express.Router();

router.post('/add', addCustomer);
router.get('/all', getCustomers);
router.post('/push', pushToCRM);
router.post('/push/:id', pushToCRMByOne);

module.exports = router;
