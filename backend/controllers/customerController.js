const Customer = require('../models/customer');
const { pushToHubSpot } = require('../crm/hubspotIntegration');

const addCustomer = async (req, res) => {
    const { phoneNumber, firstName, lastName, email, address, currentOrganization } = req.body;
    try {
        console.log(req.body);
        if(!phoneNumber|| !firstName|| !lastName || !email || !address || !currentOrganization){
            res.status(400).json({message:"all field are required"})
            return;
        } 
        const newCustomer = new Customer({ phoneNumber, firstName, lastName, email, address, currentOrganization });
        await newCustomer.save();
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const updateCustomer = async (req, res) => {
    const { phoneNumber, firstName, lastName, email, address, currentOrganization } = req.body;
    const customerId = req.params.id;

    if (!customerId) {
        return res.status(400).json({ message: 'Customer ID is required' });
    }

    console.log(req.params.id);
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(
            customerId,
            { phoneNumber, firstName, lastName, email, address, currentOrganization },
            { new: true, runValidators: true }
        );

        if (!updatedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json(updatedCustomer);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
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

module.exports = { addCustomer, getCustomers, pushToCRM, pushToCRMByOne, updateCustomer };
