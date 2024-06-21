const hubspot = require('@hubspot/api-client');

const pushToHubSpot = async (customer) => {
    const hubspotClient = new hubspot.Client({ accessToken: process.env.HUBSPOT_API_KEY });

    const properties = {
        
        phone: customer.phoneNumber,
        firstname: customer.firstName,
        lastname: customer.lastName,
        email: customer.email,
        address: `${customer.address.street}, ${customer.address.city}, ${customer.address.state}, ${customer.address.zip}`,
        company: customer.currentOrganization,
    };

    const contactObj = { properties };

    try {
        // Search for the contact by email
        const searchResponse = await hubspotClient.crm.contacts.searchApi.doSearch({
            filterGroups: [{
                filters: [{
                    propertyName: 'email',
                    operator: 'EQ',
                    value: customer.email
                }]
            }]
        });

        if (searchResponse.results.length > 0) {
            // Contact exists, update it
            const contactId = searchResponse.results[0].id;
            const updateResponse = await hubspotClient.crm.contacts.basicApi.update(contactId, {
                properties: contactObj.properties
            });
            console.log('HubSpot Update Response:', updateResponse);
            return updateResponse;
        } else {
            // Contact does not exist, create it
            const createResponse = await hubspotClient.crm.contacts.basicApi.create({
                properties: contactObj.properties
            });
            console.log('HubSpot Create Response:', createResponse);
            return createResponse;
        }
        
    } catch (error) {
        console.error('Error Details:', error.response ? error.response.body : error.message);
        throw new Error(`HubSpot integration failed: ${error.message}`);
    }
};

module.exports = { pushToHubSpot };
