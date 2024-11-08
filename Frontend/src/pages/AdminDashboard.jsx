import React from 'react';

const AdminDashboard = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome to the admin dashboard. Here you can manage the application.</p>
            
            {/* Main stats section */}
            <div className="main grid grid-cols-3 gap-3 mb-8 ">
                {/* Total Donation */}
                <div className='p-4 bg-gray-100 rounded shadow'>
                    Total Donation
                    <div className='font-bold font-sans text-2xl'>
                        363
                    </div>
                </div>
                
                {/* Last month TOTAL Donation */}
                <div className='p-4 bg-gray-100 rounded shadow'>
                    Last month Donation
                    <div className='font-bold font-sans text-2xl'>
                        45
                    </div>
                </div>
                
                {/* TOTAL Donors */}
                <div className='p-4 bg-gray-100 rounded shadow'>
                    Total Donors
                    <div className='font-bold font-sans text-2xl'>
                        200
                    </div>
                </div>
            </div>

            {/* Other sections */}
            <div className='grid grid-cols-3 gap-4'>
                {/* Statistics */}
                <div className='col-span-2 p-4 bg-gray-200 rounded shadow'>
                    Statistics
                </div>

                {/* Fundraiser Status */}
                <div className='p-4 bg-gray-200 rounded shadow'>
                    Fundraiser Status
                </div>
            </div>


            {/* List of donors */}
            <div className='p-4 bg-gray-200 rounded shadow mt-4'>
                List of Top Donors
            </div>
        </div>
    );
};

export default AdminDashboard;
