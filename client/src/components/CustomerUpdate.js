import React, { useState } from 'react';

const CustomerUpdate = ({ selectedCustomer, setSelectedCustomer, handleUpdate }) => {
    const [customerData, setCustomerData] = useState(selectedCustomer);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setCustomerData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleAddressChange = (e) => {
        const { id, value } = e.target;
        setCustomerData((prevData) => ({
            ...prevData,
            address: {
                ...prevData.address,
                [id]: value,
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdate(customerData);
    };

    const handleModalClose = () => {
        setSelectedCustomer(null);
    };

    return (
        selectedCustomer && (
            <div className='modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5' tabIndex='-1' role='dialog' id='modalSignin'>
                <div className='modal-dialog' role='document'>
                    <div className='modal-content rounded-4 shadow'>
                        <div className='modal-header p-5 pb-4 border-bottom-0'>
                            <h1 className='fw-bold mb-0 fs-2'>Edit Customer</h1>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' onClick={handleModalClose}></button>
                        </div>
                        <div className='modal-body p-5 pt-0'>
                            <form onSubmit={handleSubmit}>
                                <div className='form-floating mb-3'>
                                    <input type='text' className='form-control rounded-3' id='firstName' placeholder='First Name' defaultValue={customerData.firstName} onChange={handleInputChange} />
                                    <label htmlFor='firstName'>First Name</label>
                                </div>
                                <div className='form-floating mb-3'>
                                    <input type='text' className='form-control rounded-3' id='lastName' placeholder='Last Name' defaultValue={customerData.lastName} onChange={handleInputChange} />
                                    <label htmlFor='lastName'>Last Name</label>
                                </div>
                                <div className='form-floating mb-3'>
                                    <input type='text' className='form-control rounded-3' id='phoneNumber' placeholder='Phone Number' defaultValue={customerData.phoneNumber} onChange={handleInputChange} />
                                    <label htmlFor='phoneNumber'>Phone Number</label>
                                </div>
                                <div className='form-floating mb-3'>
                                    <input type='email' className='form-control rounded-3' id='email' placeholder='Email' defaultValue={customerData.email} onChange={handleInputChange} />
                                    <label htmlFor='email'>Email</label>
                                </div>
                                <div className='form-floating mb-3'>
                                    <input type='text' className='form-control rounded-3' id='street' placeholder='Street' defaultValue={customerData.address.street} onChange={handleAddressChange} />
                                    <label htmlFor='street'>Street</label>
                                </div>
                                <div className='form-floating mb-3'>
                                    <input type='text' className='form-control rounded-3' id='city' placeholder='City' defaultValue={customerData.address.city} onChange={handleAddressChange} />
                                    <label htmlFor='city'>City</label>
                                </div>
                                <div className='form-floating mb-3'>
                                    <input type='text' className='form-control rounded-3' id='state' placeholder='State' defaultValue={customerData.address.state} onChange={handleAddressChange} />
                                    <label htmlFor='state'>State</label>
                                </div>
                                <div className='form-floating mb-3'>
                                    <input type='text' className='form-control rounded-3' id='zip' placeholder='ZIP' defaultValue={customerData.address.zip} onChange={handleAddressChange} />
                                    <label htmlFor='zip'>ZIP</label>
                                </div>
                                <div className='form-floating mb-3'>
                                    <input type='text' className='form-control rounded-3' id='currentOrganization' placeholder='Current Organization' defaultValue={customerData.currentOrganization} onChange={handleInputChange} />
                                    <label htmlFor='currentOrganization'>Current Organization</label>
                                </div>
                                <button className='w-100 mb-2 btn btn-lg rounded-3 btn-primary' type='submit'>Save Changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default CustomerUpdate;
