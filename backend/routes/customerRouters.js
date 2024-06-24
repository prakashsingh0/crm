const express = require('express');
const { addCustomer, getCustomers, pushToCRM, pushToCRMByOne, updateCustomer } = require('../controllers/customerController');
const router = express.Router();

router.post('/add', addCustomer);
router.get('/all', getCustomers);
router.post('/push', pushToCRM);
router.post('/push/:id', pushToCRMByOne);
router.put('/update/:id', updateCustomer);

module.exports = router;
