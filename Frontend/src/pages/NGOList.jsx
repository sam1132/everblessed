import React, { useState } from 'react';

const NGOList = () => {
    const [ngos, setNgos] = useState([
        { 
            id: 1, 
            name: 'NGO 1', 
            location: 'New York, USA', 
            category: 'Education', 
            mission: 'Providing quality education to underprivileged children.', 
            donations: 10000, 
            projects: 5, 
            contact: 'contact@ngo1.org', 
            socialLinks: { website: '#', facebook: '#', twitter: '#' }
        },
        { 
            id: 2, 
            name: 'NGO 2', 
            location: 'London, UK', 
            category: 'Health', 
            mission: 'Promoting healthcare and wellness worldwide.', 
            donations: 15000, 
            projects: 3, 
            contact: 'info@ngo2.org', 
            socialLinks: { website: '#', linkedin: '#'}
        },
        { 
            id: 3, 
            name: 'NGO 3', 
            location: 'Mumbai, India', 
            category: 'Environment', 
            mission: 'Working on environmental conservation and sustainability.', 
            donations: 8000, 
            projects: 8, 
            contact: 'hello@ngo3.org', 
            socialLinks: { website: '#', linkedin: '#' }
        },
        { 
            id: 4, 
            name: 'NGO 4', 
            location: 'Paris, France', 
            category: 'Animal Welfare', 
            mission: 'Protecting animal rights and promoting adoption.', 
            donations: 5000, 
            projects: 2, 
            contact: 'animals@ngo4.org', 
            socialLinks: { instagram: '#' }
        },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = ngos.slice(firstIndex, lastIndex);
    const npage = Math.ceil(ngos.length / recordsPerPage);
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

    return (
        <>
            <div className="border-blue-600 border-2 rounded-md overflow-x-auto">
                <table className="min-w-full border-spacing-4">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left text-sm sm:text-base">NGO Name</th>
                            <th className="px-4 py-2 text-left text-sm sm:text-base">Location</th>
                            <th className="px-4 py-2 text-left text-sm sm:text-base">Category</th>
                            <th className="px-4 py-2 text-left text-sm sm:text-base">Mission</th>
                            <th className="px-4 py-2 text-left text-sm sm:text-base">Donations</th>
                            <th className="px-4 py-2 text-left text-sm sm:text-base">Projects</th>
                            <th className="px-4 py-2 text-left text-sm sm:text-base">Contact</th>
                            <th className="px-4 py-2 text-left text-sm sm:text-base">Social Links</th>
                            {/* <th className="px-4 py-2 text-left text-sm sm:text-base">Actions</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {ngos.length > 0 ? (
                            records.map((ngo) => (
                                <tr key={ngo.id} className="border-t">
                                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base whitespace-normal">{ngo.name}</td>
                                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base whitespace-normal">{ngo.location}</td>
                                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base whitespace-normal">{ngo.category}</td>
                                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base whitespace-normal">{ngo.mission}</td>
                                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base whitespace-normal">${ngo.donations}</td>
                                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base whitespace-normal">{ngo.projects}</td>
                                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base whitespace-normal">{ngo.contact}</td>
                                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base whitespace-normal">
                                        <a href={ngo.socialLinks.insta} target="_blank" rel="noopener noreferrer">Instagram</a> | 
                                        <a href={ngo.socialLinks.facebook} target="_blank" rel="noopener noreferrer">Facebook</a> |
                                        <a href={ngo.socialLinks.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
                                    </td>
                                    <td className="px-3 py-2 text-xs sm:text-sm md:text-base whitespace-normal">
                                        
                                        
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={9} className="text-center py-4 text-sm sm:text-base">
                                    No NGOs found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            <div className='flex flex-row-reverse space-x-2'>
                <div>
                    <button className="px-2" onClick={prePage} disabled={currentPage === 1}>Previous</button>
                </div>
                <div className="px-2">{currentPage}</div>
                <div>
                    <button className="px-2" onClick={nextPage} disabled={currentPage === npage}>Next</button>
                </div>
            </div>
        </>
    );
};

export default NGOList;
