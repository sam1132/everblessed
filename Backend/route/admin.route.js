import express from "express";
import { getDonations,TotalNGOTypes,DonationsAccToPickupLocation, TopDonors,getDonationStatus, donationEachCategory,getDonationNeed,ngolist } from "../Controller/admincharts.controller.js";
import { getDonationslist } from "../Controller/admin.controller.js";

const router = express.Router();

router.route("/getDonations").post(getDonations)
router.route("/getNGOTypes").get(TotalNGOTypes)
router.route("/getDonationsAccToPickupLocation").post(DonationsAccToPickupLocation)
router.route("/getTopDonors").post(TopDonors)
router.route("/getDonationStatus").post(getDonationStatus).get(getDonationStatus)
router.route("/donationEachCategory").post(donationEachCategory)
router.route("/getDonationNeed").get(getDonationNeed)
router.route("/ngolist").get(ngolist)
router.route("/getDonationslist").get(getDonationslist)


export default router;