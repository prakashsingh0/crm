const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    phoneNumber: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    address: { 
        street: String, 
        city: String, 
        state: String, 
        zip: String 
    },
    currentOrganization: String,
});

module.exports = mongoose.model('Customer', customerSchema);
