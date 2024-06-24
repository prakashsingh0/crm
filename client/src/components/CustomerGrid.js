import React from 'react';

const CustomerGrid = ({ customers, handlePushToCRMbyOne, setSelectedCustomer }) => {
    const handleEditClick = (customer) => {
        setSelectedCustomer(customer);
    };

    return (
        <div className='fs-4 mx-4' style={{ overflow: 'hidden', overflowY: 'scroll', height: '23rem' }}>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope='col'>First Name</th>
                        <th scope='col'>Last Name</th>
                        <th scope='col'>Phone Number</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Address</th>
                        <th scope='col'>Current Organization</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer._id}>
                            <td>{customer.firstName}</td>
                            <td>{customer.lastName}</td>
                            <td>{customer.phoneNumber}</td>
                            <td>{customer.email}</td>
                            <td>{`${customer.address.street}, ${customer.address.city}, ${customer.address.state}, ${customer.address.zip}`}</td>
                            <td>{customer.currentOrganization}</td>
                            <td className='text-center'>
                                <button className='btn btn-danger' onClick={() => handleEditClick(customer)}>Edit</button>
                                <button className='btn btn-primary ms-2' onClick={() => handlePushToCRMbyOne(customer._id)}>Push to CRM</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerGrid;
