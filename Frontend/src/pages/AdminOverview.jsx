import React, { useState } from 'react';

const AdminOverview = () => {
    const [Cglist, setCgList] = useState([]);

    return (
        <>
            {/* Main stats section */}
            <div className="main grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                {/* Total Donation */}
                <div className="p-4 bg-gray-100 rounded shadow text-center">
                    Total Donation
                    <div className="font-bold font-sans text-xl md:text-2xl">363</div>
                </div>

                {/* Last month TOTAL Donation */}
                <div className="p-4 bg-gray-100 rounded shadow text-center">
                    Last Month Donation
                    <div className="font-bold font-sans text-xl md:text-2xl">45</div>
                </div>

                {/* TOTAL Donors */}
                <div className="p-4 bg-gray-100 rounded shadow text-center">
                    Total Donors
                    <div className="font-bold font-sans text-xl md:text-2xl">200</div>
                </div>
            </div>

            {/* Other sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Statistics */}
                <div className="col-span-2 p-4 bg-gray-200 rounded shadow">Statistics</div>

                {/* Fundraiser Status */}
                <div className="p-4 bg-gray-200 rounded shadow">
                    <div className="font-bold text-lg">Donations by Category</div>
                </div>
            </div>

            {/* List of donors */}
            <div className="p-4 bg-gray-200 rounded shadow mt-4">
                <div className="font-bold mb-2">List of Donors</div>
                <div className="table-auto overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr>
                                <th className="px-2 py-1 text-left">Name</th>
                                <th className="px-2 py-1 text-left">Email</th>
                                <th className="px-2 py-1 text-left">Campaign</th>
                                <th className="px-2 py-1 text-left">Time</th>
                                <th className="px-2 py-1 text-left">Donation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Table rows */}
                            {Cglist.length > 0 ? (
                                Cglist.map((donor, index) => (
                                    <tr key={index}>
                                        <td className="border px-2 py-1">{donor.name}</td>
                                        <td className="border px-2 py-1">{donor.email}</td>
                                        <td className="border px-2 py-1">{donor.campaign}</td>
                                        <td className="border px-2 py-1">{donor.time}</td>
                                        <td className="border px-2 py-1">{donor.donation}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="border px-2 py-4 text-center">No Donors</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default AdminOverview;
