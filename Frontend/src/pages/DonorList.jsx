import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DonorList = () => {
    const [donors, setDonors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const recordsPerPage = 10;
    const totalPages = Math.ceil(donors.length / recordsPerPage);

    const fetchDonors = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:4000/admin/getDonarslist`);
            setDonors(response.data); 
            console.log(response.data);
        } catch (err) {
            setError('Failed to fetch donors');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDonors();
    }, []);

    // Get donors for the current page
    const currentDonors = donors.slice(
        (currentPage - 1) * recordsPerPage,
        currentPage * recordsPerPage
    );

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <div className="border-blue-600 border-2 rounded-md overflow-x-auto">
                <table className="min-w-full border-spacing-4  text-white">
                    <thead className='bg-[#0a2463] text-white'>
                        <tr>
                            <th className="px-4 py-2 text-left text-sm sm:text-base">Name</th>
                            <th className="px-4 py-2 text-left text-sm sm:text-base">Email</th>
                            <th className="px-4 py-2 text-left text-sm sm:text-base">Donation</th>
                            <th className="px-4 py-2 text-left text-sm sm:text-base">Time</th>
                            <th className="px-4 py-2 text-left text-sm sm:text-base">Message</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {loading ? (
                            <tr className='bg-[#2196f3]'>
                                <td colSpan={5} className="text-center py-4 text-sm sm:text-base">
                                    Loading...
                                </td>
                            </tr>
                        ) : error ? (
                            <tr className='bg-[#2196f3]'>
                                <td colSpan={5} className="text-center py-4 text-sm sm:text-base">
                                    {error}
                                </td>
                            </tr>
                        ) : currentDonors.length > 0 ? (
                            currentDonors.map((donor) => (
                                <tr key={donor.id || donor.email} className='bg-[#2196f3]'> {/* Ensure unique key */}
                                    <td className="px-2 py-2 text-xs sm:text-sm md:text-base whitespace-normal">{donor.name}</td>
                                    <td className="px-2 py-2 text-xs sm:text-sm md:text-base whitespace-pre">{donor.email}</td>
                                    <td className="px-2 py-2 text-xs sm:text-sm md:text-base whitespace-normal">{donor.donationCount}</td>
                                    <td className="px-2 py-2 text-xs sm:text-sm md:text-base whitespace-normal">{new Date(donor.latestDonationDate).toLocaleDateString()}</td>
                                    <td className="px-2 py-2 text-xs sm:text-sm md:text-base whitespace-pre-line">{donor.latestDonationMessage}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center py-4 text-sm sm:text-base">
                                    No donors found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-4 space-x-2">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                    onClick={prevPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="px-4 py-2">{currentPage}</span>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default DonorList;
