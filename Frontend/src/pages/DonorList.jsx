import React, { useState } from 'react';

const DonorList = () => {
    const [donors, setDonors] = useState([
        { id: 1, name: 'John Doe', email: 'johndoe@example.com', Donation: 100, date: new Date(), Message: 'Thank you! This message is longer than usual to test line wrapping in the table.' },
        { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', Donation: 50, date: new Date(), Message: 'Happy to help!' },
        { id: 3, name: 'John Doe', email: 'johndoe@example.com', Donation: 200, date: new Date(), Message: 'Thank you! This message is longer than usual to test line wrapping in the table.' },
        { id: 4, name: 'John Doe', email: 'johndoe@example.com', Donation: 300, date: new Date(), Message: 'Thank you! This message is longer than usual to test line wrapping in the table.' },
        { id: 5, name: 'John Doe', email: 'johndoe@example.com', Donation: 400, date: new Date(), Message: 'Thank you! This message is longer than usual to test line wrapping in the table.' },
        { id: 6, name: 'John Doe', email: 'johndoe@example.com', Donation: 500, date: new Date(), Message: 'Thank you! This message is longer than usual to test line wrapping in the table.' },
        { id: 7, name: 'John Doe', email: 'johndoe@example.com', Donation: 600, date: new Date(), Message: 'Thank you! This message is longer than usual to test line wrapping in the table.' },
        { id: 8, name: 'John Doe', email: 'johndoe@example.com', Donation: 700, date: new Date(), Message: 'Thank you! This message is longer than usual to test line wrapping in the table.' },
        { id: 9, name: 'John Doe', email: 'johndoe@example.com', Donation: 800, date: new Date(), Message: 'Thank you! This message is longer than usual to test line wrapping in the table.' },
        { id: 10, name: 'John Doe', email: 'johndoe@example.com', Donation: 900, date: new Date(), Message: 'Thank you! This message is longer than usual to test line wrapping in the table.' },
        { id: 11, name: 'John Doe', email: 'johndoe@example.com', Donation: 1000, date: new Date(), Message: 'Thank you! This message is longer than usual to test line wrapping in the table.' },
        { id: 12, name: 'John Doe', email: 'johndoe@example.com', Donation: 1100, date: new Date(), Message: 'Thank you! This message is longer than usual to test line wrapping in the table.' },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = donors.slice(firstIndex, lastIndex);
    const npage = Math.ceil(donors.length / recordsPerPage);

    const nextPage = () => {
        if (currentPage < npage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prePage = () => {
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
                        {records.length > 0 ? (
                            records.map((donor) => (
                                <tr key={donor.id} className="border-t">
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
                                    No order history
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-4 space-x-2">
                <button className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50" onClick={prePage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span className="px-4 py-2">{currentPage}</span>
                <button className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50" onClick={nextPage} disabled={currentPage === npage}>
                    Next
                </button>
            </div>
        </>
    );
};

export default DonorList;
