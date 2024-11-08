import React from 'react'

const AdminReport = () => {


  return (
    <div className='grid grid-flow-row'>
      <div className="NGO flex gap-5 ">
        <div className="barchartNGO">Bar Chart of donation to a NGO</div>
        <div className="NGOTypes">Total NGO acc to type</div>
        <div className="DonationAccToPickupLocation"> Donations acc to pickup location</div>
        
        {/* <div className="TopNGODonated"> Top NGO Donated</div> */}
      </div>
      <div className="User flex-auto">
        {/* <div className="DonationsPerUser">Total Donations Per User</div> */}
        <div className="DonationStatus">Donation status</div>
        

      </div>
      <div className='flex '>
      <div className="Donors flex-1 flex flex-col ">
        <div className="topdonors px-2 py-4">Top Donors</div>
        <div className="topDonationsEachCategory px-2 py-4"> Total Donations in Each category</div>
    </div>
        <div className="Donors flex-1 flex flex-col ">
        <div className="MostActiveDonor px-2 py-4">Most Active Donor</div>
        <div className="DonationNeed px-2 py-4">Donation Need</div>

      </div>
    </div>
    </div>
  )
}

export default AdminReport;
