import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import AdminOverview from './AdminOverview';
import DonorList from './DonorList';
import NGOList  from './NGOList';
import AdminReport from './AdminReport';

const AdminDashboard = () => {
    return (
        <>

        <div className='max-w-[105rem] mx-auto px-8 md:px-10 pt-7 md:pt-0 my-10 grid grid-cols-5 space-x-2'>
           <div className='col-span-1'>
           <AdminNavbar/>    
            </div> 
            <div className='col-span-4'>
                {/* Adding admin dashboar individual components */}
                <Routes>
                        <Route path="/overview" element={<AdminOverview />} />
                        <Route path="/donors" element={<DonorList/>}/>
                        <Route path='/ngos' element={<NGOList/>}/>
                        <Route path="/report" element={<AdminReport/>}/>
                    </Routes>
            
            </div>
        </div>

        
        </>
    );
};

export default AdminDashboard;
