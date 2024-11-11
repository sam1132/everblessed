import asyncHandler from "express-async-handler";
import Donation from "../Model/Donation.model.js";
import mongoose from "mongoose";
import NGO from "../Model/Ngo.model.js";


const monthStringToNumber = (monthString) => {
    const months = {
        "January": 1,
        "February": 2,
        "March": 3,
        "April": 4,
        "May": 5,
        "June": 6,
        "July": 7,
        "August": 8,
        "September": 9,
        "October": 10,
        "November": 11,
        "December": 12
    };
    return months[monthString] || null;
};



export const ngolist = asyncHandler( async (req, res) => {
    try {
        const ngos = await NGO.find({}, 'ngoname'); // Select only the 'name' field
        res.status(200).json(ngos);
    } catch (error) {
        console.error("Error fetching NGO names:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export const getDonations = asyncHandler(async (req, res) => {
    console.log(`Request Body: ${JSON.stringify(req.body, null, 2)}`);
    const { ngoname, month } = req.body;
    console.log('ngoname:', ngoname, 'month:', month);

    if (!ngoname || !month) {
        return res.status(400).json({ message: "NGOId and month are required" });
    }
    
    const ngo = await NGO.findOne({ ngoname:ngoname });
    if(!ngo){   
        return res.status(404).json({message:"NGO not found"})
    }
    else{
        console.log('ngo:',ngo._id)
    }


    

    let year = 2024;

    const startDate = new Date(year, month , 1); 
    const endDate = new Date(year, month+1, 0); 

    const donationsAggregation = [
        {
            $match: {
                ngo: ngo._id, 
                createdAt: {
                    $gte: startDate,
                    $lt: endDate,
                },
            },
        },
        {
            $project: {
                day: { $dayOfMonth: "$createdAt" }, 
            },
        },
        {
            $group: {
                _id: "$day", 
                count: { $sum: 1 }, 
            },
        },
        {
            $sort: {
                _id: 1, 
            },
        },
    ];

    try {
        
        const data = await Donation.aggregate(donationsAggregation);
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching donations data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export const TotalNGOTypes = asyncHandler(async(req,res)=>{
    console.log("Request Body:", JSON.stringify(req.body,null,2))
    
    const types = [
        { $match: { ngoType: { $exists: true, $ne: null } } }, // Exclude docs where ngoType is null or missing
        {
            $group: {
                _id: "$ngoType",
                count: { $sum: 1 },
            },
        },
        {
            $sort: {
                count: -1,
            },
        },
    ];
    

    try{
        const data = await NGO.aggregate(types);
        res.status(200).json(data);
    }catch(error){
        console.error("Error fetching donations data:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
})


export const DonationsAccToPickupLocation = asyncHandler(async (req, res) => {
    console.log(`Request Body: ${JSON.stringify(req.body, null, 2)}`);
    const { month } = req.body;
    console.log('month:', month);

    if (!month) {
        return res.status(400).json({ message: "Month is required" });
    }

    const startDate = new Date(2024, month - 1, 1);
    const endDate = new Date(2024, month, 0);

    const donationsLocation = [
        {
            $match: {
                createdAt: {
                    $gte: startDate,
                    $lt: endDate
                }
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'users',
                foreignField: '_id',
                as: 'userDetails'
            }
        },
        {
            $unwind: "$userDetails"
        },
        {
            $group: {
                _id: "$userDetails.address", // Group by the user's address
                count: { $sum: 1 }
            }
        },
        {
            $sort: {
                count: -1
            }
        }
    ];

    try {
        const data = await Donation.aggregate(donationsLocation);
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching donations data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export const TopDonors = asyncHandler(async (req, res) => {
    console.log(`Request Body: ${JSON.stringify(req.body, null, 2)}`);
    const { month } = req.body;
    console.log('month:', month);

    
    if (!month) {
        return res.status(400).json({ message: "Month is required" });
    }

    
    const startDate = new Date(2024, month - 1, 1); 
    const endDate = new Date(2024, month, 0); 

    
    const donationsLocation = [
        {
            $match: {
                createdAt: {
                    $gte: startDate,
                    $lt: endDate,
                },
                status: 'approved', 
            },
        },
        {
            $unwind: "$users", 
        },
        {
            $group: {
                _id: "$users", 
                count: { $sum: 1 }, 
            },
        },
        {
            $sort: {
                count: -1, 
            },
        },
        {
            $limit: 5, 
        },
        {
            $lookup: {
                from: 'users', 
                localField: '_id', 
                foreignField: '_id', 
                as: 'userDetails',
            },
        },
        {
            $unwind: '$userDetails', 
        },
        {
            $project: {
                _id: 0, // Exclude the _id from the final output
                user: '$userDetails', // Include the user details in the result
                donationCount: '$count', // Include the donation count
            },
        },
    ];

    try {
        
        const data = await Donation.aggregate(donationsLocation);
        
        
        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No donations found for the given month" });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching donations data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


export const getDonationStatus = asyncHandler(async(req,res)=>{
    console.log(`Request Body: ${JSON.stringify(req.body,null,2)}`);
    const {month} = req.body;
    
    console.log('month:',month);
    if(!month){
        return res.status(400).json({message:"Month is required"})
    }
    

    const startDate = new Date(2024,month-1,1)
    const endDate = new Date(2024,month,0)

    const donationsStatus = [
        {
            $match:{
                createdAt:{
                    $gte:startDate,
                    $lt:endDate
                }
            }
        },
        {
            $group:{
                _id:"$status",
                count:{$sum:1}
            }
        }
    ]
    try{
        const data = await Donation.aggregate(donationsStatus)
        res.status(200).json(data)
    }catch(error){  
        console.error("Error fetching donations data:",error)
        res.status(500).json({error:"Internal Server Error"})
    }
})

export const donationEachCategory = asyncHandler(async(req,res)=>{
    console.log(`Request Body: ${JSON.stringify(req.body,null,2)}`);
    const {month} = req.body;
    console.log('month:',month);
    if(!month){
        return res.status(400).json({message:"Month is required"})
    }
   

    const startDate = new Date(2024,month-1,1)
    const endDate = new Date(2024,month,0)

    const donationsCategory = [
        {
            $match:{
                createdAt:{
                    $gte:startDate,
                    $lt:endDate
                }
            }
        },
        {
            $unwind:"$donationType"
        },
        {
            $group:{
                _id:"$donationType",
                count:{$sum:1}
            }
        }
    ]
    try{
        const data = await Donation.aggregate(donationsCategory)
        res.status(200).json(data)
    }catch(error){
        console.error("Error fetching donations data:",error)
        res.status(500).json({error:"Internal Server Error"})
    }
})

export const getDonationNeed = asyncHandler(async (req, res) => {
    console.log(`Request Body: ${JSON.stringify(req.body, null, 2)}`);

    try {
        const need = [
            {
                $match: {
                    isApproved: true 
                }
            },
            {
                $unwind: "$thingsRequired" 
            },
            {
                $group: {
                    _id: "$thingsRequired",
                    count: { $sum: 1 } 
                }
            },
            {
                $sort: {
                    count: -1 
                }
            }
        ];

        const data = await NGO.aggregate(need);
        res.status(200).json(data);

    } catch (error) {
        console.error("Error fetching donations data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

