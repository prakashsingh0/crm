import React, { useState, useEffect } from 'react';
import CustomerForm from './components/CustomerForm';
import CustomerGrid from './components/CustomerGrid';
import CustomerUpdate from './components/CustomerUpdate';
import { getCustomers, pushToCRM, pushToCRMOne, updateCustomer } from './api/customerApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const fetchCustomers = async () => {
        try {
            const customerList = await getCustomers();
            setCustomers(customerList);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleCustomerAdded = (newCustomer) => {
        setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
    };

    const handlePushToCRM = async () => {
        try {
            const response = await pushToCRM(customers);
            toast.success(response.message);
        } catch (error) {
            toast.error(error.response?.message || 'Error pushing to CRM');
            console.error('Error pushing to CRM:', error);
        }
    };

    const handlePushToCRMbyOne = async (id) => {
        try {
            const response = await pushToCRMOne(id);
            toast.success(response.message);
        } catch (error) {
            toast.error(error.response?.message || 'Error pushing to CRM');
            console.error('Error pushing to CRM:', error);
        }
    };

    const handleUpdate = async (customerData) => {
        try {
            const response = await updateCustomer(customerData);
            toast.success(response.message);
            await fetchCustomers(); // Ensure fetching customers after updating
            setSelectedCustomer(null);
        } catch (error) {
            toast.error(error.message || 'Error updating customer');
            console.error('Error updating customer:', error);
        }
    };

    return (
        <div>
            {selectedCustomer ? (
                <CustomerUpdate selectedCustomer={selectedCustomer} setSelectedCustomer={setSelectedCustomer} handleUpdate={handleUpdate} />
            ) : (
                <div>
                    <CustomerForm onCustomerAdded={handleCustomerAdded} />
                    <CustomerGrid customers={customers} handlePushToCRMbyOne={handlePushToCRMbyOne} setSelectedCustomer={setSelectedCustomer} />
                    <button onClick={handlePushToCRM} className='btn bg-primary ms-4 fs-3 rounded-pill'>Bulk Push to CRM</button>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default App;
