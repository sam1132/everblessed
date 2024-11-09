import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DonorList = () => {
    const [donors, setDonors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const recordsPerPage = 10;

    const fetchDonors = async () => {
        setLoading(true);
        setError(null);
        try {
            const startIndex = (currentPage - 1) * recordsPerPage;
            const endIndex = currentPage * recordsPerPage - 1;
            const response = await axios.get(`http://localhost:4000/admin/getDonationslist`, {
                params: { startIndex, endIndex }
            });
            setDonors(response.data.donors);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            setError('Failed to fetch donors');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDonors();
    }, [currentPage]);

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
        <>
            <div className="border-blue-600 border-2 rounded-md overflow-x-auto">
                <table className="min-w-full border-spacing-4">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left text-sm sm:text-base">Name</th>
                            <th className="px-4 py-2 text-left text-sm sm:text-base">Email</th>
                            <th className="px-4 py-2 text-left text-sm sm:text-base">Donation</th>
                            <th className="px-4 py-2 text-left text-sm sm:text-base">Time</th>
                            <th className="px-4 py-2 text-left text-sm sm:text-base">Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="text-center py-4 text-sm sm:text-base">
                                    Loading...
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan={5} className="text-center py-4 text-sm sm:text-base">
                                    {error}
                                </td>
                            </tr>
                        ) : donors.length > 0 ? (
                            donors.map((donor) => (
                                <tr key={donor.id || donor.email}> {/* Ensure unique key */}
                                    <td className="px-2 py-2 text-xs sm:text-sm md:text-base whitespace-normal">{donor.name}</td>
                                    <td className="px-2 py-2 text-xs sm:text-sm md:text-base whitespace-pre">{donor.email}</td>
                                    <td className="px-2 py-2 text-xs sm:text-sm md:text-base whitespace-normal">{donor.Donation}</td>
                                    <td className="px-2 py-2 text-xs sm:text-sm md:text-base whitespace-normal">{new Date(donor.date).toLocaleDateString()}</td>
                                    <td className="px-2 py-2 text-xs sm:text-sm md:text-base whitespace-pre-line">{donor.Message}</td>
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
                <button className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50" onClick={prevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span className="px-4 py-2">{currentPage}</span>
                <button className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50" onClick={nextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </>
    );
};

export default DonorList;
