import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa'; // Import trash bin icon
import { TiTick } from 'react-icons/ti'; // Import trash bin icon
import { ImCross } from "react-icons/im";


const NGOList = () => {
    const [ngos, setNgos] = useState([]);

    useEffect(() => {
        const fetchNGOs = async () => {
            try {
                const response = await axios.get('http://localhost:4000/admin/getNGOList');
                setNgos(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchNGOs();
    }, []);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = ngos.slice(firstIndex, lastIndex);
    const npage = Math.ceil(ngos.length / recordsPerPage);
    
    // Change page
    const nextPage = () => {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prePage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const changeCurrentPage = (id) => {
        setCurrentPage(id);
    };

    // Handle approving an NGO
    const handleApprove = async (ngoId) => {
        console.log(ngoId);
        try {
            const response = await axios.put(`http://localhost:4000/admin/approveNGO/${ngoId}`, {
                isApproved: true,
            });
            setNgos((prevNgos) =>
                prevNgos.map((ngo) =>
                    ngo.id === ngoId ? { ...ngo, approved: true } : ngo
                )
            );
            console.log(response.data);
        } catch (error) {
            console.error("Error approving NGO:", error);
        }
    };

    // Handle rejecting an NGO
    const handleReject = async (ngoId) => {
        try {
            const response = await axios.put(`http://localhost:4000/admin/rejectNGO/${ngoId}`, {
                approved: false,
            });
            setNgos((prevNgos) =>
                prevNgos.map((ngo) =>
                    ngo.id === ngoId ? { ...ngo, approved: false } : ngo
                )
            );
            console.log(response.data);
        } catch (error) {
            console.error("Error rejecting NGO:", error);
        }
    };

    // Handle deleting an NGO
    const handleDelete = async (ngoId) => {
        try {
            const response = await axios.delete(`http://localhost:4000/admin/deleteNGO/${ngoId}`);
            setNgos(ngos.filter((ngo) => ngo.id !== ngoId));
            console.log(response.data);
        } catch (error) {
            console.error("Error deleting NGO:", error);
        }
    };

    return (
        <>
            <div className="border-blue-600 border-2 rounded-md overflow-x-auto">
                <table className="min-w-full border-spacing-4">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left text-sm sm:text-base">NGO Name</th>
                            <th className="px-4 py-2 text-left text-sm sm:text-base">Location</th>
                            <th className="px-4 py-2 text-left text-sm sm:text-base">Type</th>
                            <th className="px-4 py-2 text-left text-sm sm:text-base">Donations</th>
                            <th className="px-4 py-2 text-left text-sm sm:text-base">Contact</th>
                            <th className="px-4 py-2 text-left text-sm sm:text-base">Social Links</th>
                            <th className="px-4 py-2 text-left text-sm sm:text-base">Actions</th>
                            <th className="px-4 py-2 text-left text-sm sm:text-base">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ngos.length > 0 ? (
                            records.map((ngo) => (
                                <tr key={ngo.id} className="border-t">
                                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base whitespace-normal">{ngo.ngoname}</td>
                                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base whitespace-normal">{ngo.address}</td>
                                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base whitespace-normal">{ngo.ngoType}</td>
                                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base whitespace-normal">{ngo.totalDonationsMade}</td>
                                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base whitespace-normal">{ngo.email}</td>
                                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base whitespace-normal">
                                        <a href={ngo.socialLinks.insta} target="_blank" rel="noopener noreferrer">Instagram</a>
                                        <br/>
                                        <a href={ngo.socialLinks.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
                                        <br/>
                                        <a href={ngo.socialLinks.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
                                    </td>

                                    {/* Actions Column */}
                                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base whitespace-normal">
                                        {ngo.isApproved ? (
                                            <button className="bg-green-500 text-white px-4 py-2 rounded">Approved</button>
                                        ) : (
                                            <>
                                                <button
                                                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                                                    onClick={() => handleApprove(ngo._id)}
                                                >
                                                    <TiTick/>
                                                </button>
                                                <button
                                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                                    onClick={() => handleReject(ngo._id)}
                                                >
                                                    <ImCross/>
                                                </button>
                                            </>
                                        )}
                                    </td>

                                    {/* Delete Column */}
                                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base whitespace-normal">
                                        <button
                                            className="text-black-500 text-center px-4 py-2 rounded h-20 w-20"
                                            onClick={() => handleDelete(ngo._id)}
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="text-center py-4 text-sm sm:text-base">
                                    No NGOs found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-row-reverse space-x-2">
                <div className=" ">
                    <button className="px-2 " onClick={nextPage} disabled={currentPage === npage}>Next</button>
                </div>
                <div className="px-2">{currentPage}</div>
                <div>
                    <button className="px-2 to-blue-600" onClick={prePage} disabled={currentPage === 1}>Previous</button>
                </div>
            </div>
        </>
    );
};

export default NGOList;
