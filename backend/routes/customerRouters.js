const express = require('express');
const { addCustomer, getCustomers, pushToCRM } = require('../controllers/customerController');
const router = express.Router();

router.post('/add', addCustomer);
router.get('/all', getCustomers);
router.post('/push', pushToCRM);

module.exports = router;
