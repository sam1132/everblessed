import asyncHandler from "express-async-handler";
import User from "../Model/User.model.js";
import NGO from "../Model/Ngo.model.js";
import Donation from "../Model/Donation.model.js";

export const getDonarslist = asyncHandler(async (req, res) => {
    console.log(`Request Body: ${JSON.stringify(req.body, null, 2)}`);
    try {
        // Fetch users and populate the necessary fields directly from User model
        const donors = await User.aggregate([
            {
                $project: {
                    name: 1,  // Include name field
                    email: 1,  // Include email field
                    donationCount: 1,  // Include the donation count from User model
                    latestDonationMessage: {
                        $ifNull: ["$donationMessage", "Hope a good life for them"]  // Default message if no donationMessage exists
                    },
                    latestDonationDate: "$createdAt"  // Include the donation's createdAt date from User model
                }
            }
        ]);

        // Send the response with the populated donor data
        res.status(200).json(donors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch donors" });
    }
});

export const getNGOlist = asyncHandler(async (req, res) => {
    console.log(`Request Body: ${JSON.stringify(req.body, null, 2)}`);

    try {
        
        const ngos = await NGO.find({});

        res.status(200).json(ngos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch NGOs" });
    }
});


export const approveNGO = asyncHandler(async (req, res) => {
    console.log(`Request Body: ${JSON.stringify(req.body, null, 2)}`);
    console.log(`Request Params: ${JSON.stringify(req.params, null, 2)}`);
    const { id } = req.params;
    console.log("ngoId", id);

    try {
        const ngo = await NGO.findByIdAndUpdate(
            id, 
            { isApproved: true },
            { new: true }
        );
        if (!ngo) {
            return res.status(404).json({ message: 'NGO not found' });
        }
        res.status(200).json({ message: 'NGO approved', ngo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to approve NGO' });
    }
});

export const rejectNGO = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const ngo = await NGO.findByIdAndUpdate(
            id, 
            { isApproved: false },
            { new: true }
        );
        if (!ngo) {
            return res.status(404).json({ message: 'NGO not found' });
        }
        res.status(200).json({ message: 'NGO rejected', ngo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to reject NGO' });
    }
});

export const deleteNGO = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const ngo = await NGO.findByIdAndDelete(id);
        if (!ngo) {
            return res.status(404).json({ message: 'NGO not found' });
        }
        res.status(200).json({ message: 'NGO deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete NGO' });
    }
});




export const getTotalDonationsPerMonth = asyncHandler(async (req, res) => {
    const { year } = req.body;

    try {
      // Aggregating donation counts per month based on the 'createdAt' field
      const donations = await Donation.aggregate([
        {
          $project: {
            year: year, // Extract the year from 'createdAt'
            month: { $month: "$createdAt" }, // Extract the month from 'createdAt'
          },
        },
        {
          $group: {
            _id: { year: "$year", month: "$month" }, 
            totalAmount: { $sum: 1 }, 
          },
        },
        { 
          $sort: { "_id.year": 1, "_id.month": 1 } 
        },
      ]);
  
      
      const formattedData = donations.map(item => ({
        month: new Date(item._id.year, item._id.month - 1).toLocaleString('default', { month: 'long' }), 
        totalAmount: item.totalAmount, 
      }));
  
      res.status(200).json(formattedData); 
    } catch (error) {
      console.error("Error fetching donation data:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  
export const getTotalDonationCount = asyncHandler(async (req, res) => {
    try {
      const totalDonations = await Donation.countDocuments(); // Counts all documents in the Donation collection
      res.status(200).json({ totalDonations });
    } catch (error) {
      console.error("Error fetching total donation count:", error);
      res.status(500).json({ message: "Server error" });
    }
  });


  
export const getLastMonthDonationCount = asyncHandler(async (req, res) => {
    try {
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1); 
  
      
      const startOfLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1);
      const endOfLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0);
  
      
      const lastMonthDonations = await Donation.countDocuments({
        createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
      });
  
      res.status(200).json({ lastMonthDonations });
    } catch (error) {
      console.error("Error fetching last month donation count:", error);
      res.status(500).json({ message: "Server error" });
    }
  });


  
    export const getTotalDonorsCount = asyncHandler(async (req, res) => {
        try {
        
        const totalDonors = await User.aggregate([
            {
            $group: {
                _id: "$_id", 
            },
            },
            {
            $count: "totalDonors",
            }
        ]);
    
        const count = totalDonors[0]?.totalDonors || 0; // Handle if no donors found
    
        res.status(200).json({ totalDonors: count });
        } catch (error) {
        console.error("Error fetching total donors count:", error);
        res.status(500).json({ message: "Server error" });
        }
    });
    
    


// Get the latest donors
export const getLatestDonors = asyncHandler(async (req, res) => {
  try {
    // Fetch the latest donors based on donation timestamp (or other criteria)
    const latestDonors = await Donation.aggregate([
      {
        $unwind: "$users" // Flatten the users array
      },
      {
        $lookup: {
          from: "users", // Join with the User collection
          localField: "users", // Field in Donation collection
          foreignField: "_id", // Field in User collection
          as: "donorDetails" // Store joined data in 'donorDetails'
        }
      },
      {
        $unwind: "$donorDetails" // Flatten the donorDetails array
      },
      {
        $sort: { "donorDetails.createdAt": -1 } // Sort by the most recent donor (descending order)
      },
      {
        $project: {
          _id: 0,
          email: "$donorDetails.email", // Include the email of the donor
          name: "$donorDetails.name", // Include the name of the donor
          campaign: "$donationName", // Include the campaign name
          time: "$createdAt", // Include the donation timestamp
          donation: "$donationType" // Include the donation type
        }
      },
      {
        $limit: 10 // Get the latest 10 donors (you can change this number)
      }
    ]);

    res.status(200).json(latestDonors); // Return the latest donors in the response
  } catch (error) {
    console.error("Error fetching latest donors:", error);
    res.status(500).json({ message: "Server error" });
  }
});
