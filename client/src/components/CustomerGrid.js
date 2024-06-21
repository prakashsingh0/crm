import React from 'react';

const CustomerGrid = ({ customers, handlePushToCRMbyOne }) => {
    return (
        <div className='mt-4 fs-4 mx-4'>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope='col'>Phone Number</th>
                        <th scope='col'>First Name</th>
                        <th scope='col'>Last Name</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Address</th>
                        <th scope='col'>Current Organization</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer._id}>
                            <td scope='row'>{customer.phoneNumber}</td>
                            <td>{customer.firstName}</td>
                            <td>{customer.lastName}</td>
                            <td>{customer.email}</td>
                            <td>{`${customer.address.street}, ${customer.address.city}, ${customer.address.state}, ${customer.address.zip}`}</td>
                            <td>{customer.currentOrganization}</td>
                            <td className='bg-danger text-center'>Edit</td>
                            <td 
                                className='bg-primary text-center' 
                                style={{ cursor: 'pointer' }} 
                                onClick={() => handlePushToCRMbyOne(customer._id)}
                            >
                                Push to CRM
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerGrid;
