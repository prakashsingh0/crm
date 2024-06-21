const hubspot = require('@hubspot/api-client');

const pushToHubSpot = async (customer) => {
    
    const hubspotClient = new hubspot.Client({ apiKey: process.env.HUBSPOT_API_KEY });
    

    const properties = {
        phone: customer.phoneNumber,
        firstname: customer.firstName,
        lastname: customer.lastName,
        email: customer.email,
        address: `${customer.address.street}, ${customer.address.city}, ${customer.address.state}, ${customer.address.zip}`,
        company: customer.currentOrganization,
    };
    const customers ={
        phone:"7000505020",
        firstname:"prakash",
        lastname:"singh",
        email:"singh@gmail.com",
        address:"chitrakoot",
        company:"terget"

    }

    // const contactObj = { properties };

    try {
        
        const response = await hubspotClient.crm.contacts.basicApi.create(customers);
        
        console.log(response);
        return response;
    } catch (error) {
        throw new Error(`HubSpot integration failed: ${error.message}`);
    }
};

module.exports = { pushToHubSpot };
