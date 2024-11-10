import React from 'react'

const NgoProfile = () => {
    const ngos =[
        {
            ngoname: "Green Earth Initiative",
            registrationNumber: "GEI654321",
            address: "456 Greenway Blvd, Eco City",
            description: "Promotes environmental sustainability and awareness.",
            email: "info@greenearth.org",
            thingsRequired: ["anything", "food"],
            socialLinks: {
              insta: "https://instagram.com/greenearth",
              facebook: "https://facebook.com/greenearth",
              twitter: null,
            },
            usersDonated: ["605c72b7fc13ae1d4f000003"],
            ngoType: "Environmental",
            totalDonationsMade: 120,
            isApproved: false,
          },
    ]
  return (
   <>
   <main className='w-[22rem] md:w-full my-10 p-4 rounded-md  bg-white'>
    <h1 className=' text-xl md:text-3xl font-semibold'>Ngo Profile</h1>
    <div className='mt-8'>
    {ngos.map((ngo) => (
      <div key={ngo.registrationNumber} className="mb-4">
        <h1 className="text-xl font-semibold my-2">NGO Name: {ngo.ngoname}</h1>
        <p className="my-2 ">Registration Number: {ngo.registrationNumber}</p>
        <p className="my-2">Address: {ngo.address}</p>
        <p className="my-2">Description: {ngo.description}</p>
        <p className="my-2">Email: {ngo.email}</p>
        <p className="my-2">Social Links:</p>
        <ul>
          {ngo.socialLinks.insta && (
            <li>
              <a href={ngo.socialLinks.insta} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
          )}
          {ngo.socialLinks.facebook && (
            <li>
              <a href={ngo.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
          )}
          {ngo.socialLinks.twitter && (
            <li>
              <a href={ngo.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </li>
          )}
        </ul>
        <p className="my-2">NGO Type: {ngo.ngoType}</p>
        <p className="my-2">Total Donations Made: {ngo.totalDonationsMade}</p>
        <p className="my-2">Is Approved: {ngo.isApproved ? "Yes" : "No"}</p>
      </div>
    ))}


    </div>
   </main>
   </>
  )
}

export default NgoProfile