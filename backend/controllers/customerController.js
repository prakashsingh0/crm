const Customer = require('../models/customer');
const { pushToHubSpot } = require('../crm/hubspotIntegration');

const addCustomer = async (req, res) => {
    const { phoneNumber, firstName, lastName, email, address, currentOrganization } = req.body;
    try {
        
        const newCustomer = new Customer({ phoneNumber, firstName, lastName, email, address, currentOrganization });
        await newCustomer.save();
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const pushToCRM = async (req, res) => {
    try {
        
        const customers = await Customer.find();
        for (const customer of customers) {
            await pushToHubSpot(customer);
        }
        res.status(200).json({ message: 'Pushed to CRM successfully' });
    } catch (error) {
        res.status(500).json({ message: 'CRM push failed', error: error.message });
    }
};

const pushToCRMByOne = async (req, res) => {
    try {
        
        const customerInDb= await Customer.findById(req.params.id);
        console.log(req.params.id);
       
            await pushToHubSpot(customerInDb);
       
        res.status(200).json({ message: 'Pushed to CRM successfully' });
    } catch (error) {
        res.status(500).json({ message: 'CRM push failed', error: error.message });
    }
};

module.exports = { addCustomer, getCustomers, pushToCRM, pushToCRMByOne };
