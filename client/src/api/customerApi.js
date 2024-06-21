import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const addCustomer = async (customer) => {
    try {
        const response = await axios.post(`${API_URL}/customers/add`, customer);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getCustomers = async () => {
    try {
        const response = await axios.get(`${API_URL}/customers/all`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const pushToCRM = async (customer) => {
    try {
        const response = await axios.post(`${API_URL}/customers/push`, customer);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const pushToCRMOne = async (id) => {
    try {
        const response = await axios.post(`${API_URL}/customers/push/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
