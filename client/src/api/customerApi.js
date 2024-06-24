import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const addCustomer = async (customer) => {
    try {
        console.log(customer);
        const response = await axios.post(`${API_URL}/customers/add`, customer);
        console.log(response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw new Error('Network Error');
        }
    }
};

export const updateCustomer = async (customer) => {
    try {
        // const id customer.
        const response = await axios.put(`${API_URL}/customers/update/${customer._id}`, customer);
        
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw new Error('Network Error');
        }
    }
};

export const getCustomers = async () => {
    try {
        const response = await axios.get(`${API_URL}/customers/all`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw new Error('Network Error');
        }
    }
};

export const pushToCRM = async (customers) => {
    try {
        const response = await axios.post(`${API_URL}/customers/push`, customers);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw new Error('Network Error');
        }
    }
};

export const pushToCRMOne = async (id) => {
    try {
        const response = await axios.post(`${API_URL}/customers/push/${id}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw new Error('Network Error');
        }
    }
};
