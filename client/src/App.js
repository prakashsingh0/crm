import React, { useState, useEffect } from 'react';
import CustomerForm from './components/CustomerForm';
import CustomerGrid from './components/CustomerGrid';
import { getCustomers, pushToCRM, pushToCRMOne } from './api/customerApi';

const App = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const customerList = await getCustomers();
                setCustomers(customerList);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        fetchCustomers();
    }, []);

    const handleCustomerAdded = (newCustomer) => {
        setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
    };

    const handlePushToCRM = async () => {
        try {
            const response = await pushToCRM(customers);
            alert(response.message);
        } catch (error) {
            console.error('Error pushing to CRM:', error);
        }
    };

    const handlePushToCRMbyOne = async (id) => {
        try {
            const response = await pushToCRMOne(id);
            alert(response.message);
        } catch (error) {
            console.error('Error pushing to CRM:', error);
        }
    };

    return (
        <div className=''>
            <CustomerForm onCustomerAdded={handleCustomerAdded} />
            <CustomerGrid customers={customers} handlePushToCRMbyOne={handlePushToCRMbyOne}/>
            <button onClick={handlePushToCRM} className='btn bg-primary ms-4 fs-3 rounded-pill'>Push to CRM</button>
        </div>
    );
};

export default App;
