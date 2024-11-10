import mongoose from "mongoose";
import NGO from './Model/Ngo.model.js'; // Assuming your NGO model is correctly set up

async function seedNGOs() {
    try {
        const ngos = [
            {
                ngoname: 'NGO 1',
                ngoType: 'Education',  // Provide valid type
                email: 'contact@ngo1.org',
                address: '123 NGO 1 Address, City, Country',
                registrationNumber: 'NGO123456',
            },
            {
                ngoname: 'NGO 2',
                ngoType: 'Health',  // Provide valid type
                email: 'contact@ngo2.org',
                address: '456 NGO 2 Address, City, Country',
                registrationNumber: 'NGO654321',
            },
            {
                ngoname: 'NGO 3',
                ngoType: 'Environment',  // Provide valid type
                email: 'contact@ngo3.org',
                address: '789 NGO 3 Address, City, Country',
                registrationNumber: 'NGO789123',
            },
            // Add more NGOs with valid data
        ];
        
        for (const ngo of ngos) {
            const newNgo = new NGO(ngo);
            await newNgo.save();
            console.log(`NGO "${ngo.ngoname}" saved.`);
        }

        console.log("Seeding complete.");
    } catch (error) {
        console.error("Error seeding NGOs:", error);
    }
}

seedNGOs();
