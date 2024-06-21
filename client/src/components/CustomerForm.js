import React, { useState } from 'react';
import { addCustomer } from '../api/customerApi';

const CustomerForm = ({ onCustomerAdded }) => {
    const [formData, setFormData] = useState({
        phoneNumber: '',
        firstName: '',
        lastName: '',
        email: '',
        address: { street: '', city: '', state: '', zip: '' },
        currentOrganization: '',
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const errors = {};
        const phoneRegex = /^[0-9]{10}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!phoneRegex.test(formData.phoneNumber)) {
            errors.phoneNumber = 'Invalid phone number format.';
        }

        if (!formData.firstName.trim()) {
            errors.firstName = 'First name is required.';
        }

        if (!formData.lastName.trim()) {
            errors.lastName = 'Last name is required.';
        }

        if (!emailRegex.test(formData.email)) {
            errors.email = 'Invalid email format.';
        }

        if (!formData.address.street.trim()) {
            errors.street = 'Street address is required.';
        }

        if (!formData.address.city.trim()) {
            errors.city = 'City is required.';
        }

        if (!formData.address.state.trim()) {
            errors.state = 'State is required.';
        }

        if (!formData.address.zip.trim()) {
            errors.zip = 'Zip code is required.';
        }

        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('address.')) {
            const addressField = name.split('.')[1];
            setFormData((prevData) => ({
                ...prevData,
                address: { ...prevData.address, [addressField]: value },
            }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const newCustomer = await addCustomer(formData);
                onCustomerAdded(newCustomer);
                setFormData({
                    phoneNumber: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    address: { street: '', city: '', state: '', zip: '' },
                    currentOrganization: '',
                });
                setErrors({});
            } catch (error) {
                console.error('Error adding customer:', error);
            }
        }
    };

    return (
        <div className='container p-4'>
        <form onSubmit={handleSubmit} className='border py-2 px-4 d-flex flex-column  justify-items-center '>
            <div className='my-2 row'>
                <label className='col-3 pe-2 fs-3'>Phone Number:</label>
                <input className='col-4 rounded-pill px-2'
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                />
                {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
            </div>
            <div className='my-2 row'>
                <label className='col-3 pe-2 fs-3'>First Name:</label>
                <input className='col-4 rounded-pill px-2'
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                {errors.firstName && <span>{errors.firstName}</span>}
            </div>
            <div className='my-2 row'>
                <label className='col-3 pe-2 fs-3'>Last Name:</label>
                <input className='col-4 rounded-pill px-2'
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                {errors.lastName && <span>{errors.lastName}</span>}
            </div>
            <div className='my-2 row'>
                <label className='col-3 pe-2 fs-3'>Email:</label>
                <input className='col-4 rounded-pill px-2'
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <span>{errors.email}</span>}
            </div>
            <div className='my-2 row'>
                <label className='col-3 pe-2 fs-3'>Street Address:</label>
                <input className='col-4 rounded-pill px-2'
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                />
                {errors.street && <span>{errors.street}</span>}
            </div>
            <div className='my-2 row'>
                <label className='col-3 pe-2 fs-3'>City:</label>
                <input className='col-4 rounded-pill px-2'
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                />
                {errors.city && <span>{errors.city}</span>}
            </div>
            <div className='my-2 row'>
                <label className='col-3 pe-2 fs-3'>State:</label>
                <input className='col-4 rounded-pill px-2'
                    type="text"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleChange}
                />
                {errors.state && <span>{errors.state}</span>}
            </div>
            <div className='my-2 row'>
                <label className='col-3 pe-2 fs-3'>Zip Code:</label>
                <input className='col-4 rounded-pill px-2'
                    type="text"
                    name="address.zip"
                    value={formData.address.zip}
                    onChange={handleChange}
                />
                {errors.zip && <span>{errors.zip}</span>}
            </div>
            <div className='my-2 row'>
                <label className='col-3 pe-2 fs-3'>Current Organization:</label>
                <input className='col-4 rounded-pill px-2'
                    type="text"
                    name="currentOrganization"
                    value={formData.currentOrganization}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" className='btn fs-3 bg-primary'>Submit</button>
        </form>
        </div>
    );
};

export default CustomerForm;
