import express from "express";
import { getDonations,TotalNGOTypes,DonationsAccToPickupLocation, TopDonors,getDonationStatus, donationEachCategory,getDonationNeed,ngolist } from "../Controller/admincharts.controller.js";
import { getDonarslist,getNGOlist ,approveNGO,rejectNGO, deleteNGO,getTotalDonationsPerMonth,getTotalDonationCount,getLastMonthDonationCount,getTotalDonorsCount,getLatestDonors} from "../Controller/admin.controller.js";

const router = express.Router();

router.route("/getDonations").post(getDonations)
router.route("/getNGOTypes").get(TotalNGOTypes)
router.route("/getDonationsAccToPickupLocation").post(DonationsAccToPickupLocation)
router.route("/getTopDonors").post(TopDonors)
router.route("/getDonationStatus").post(getDonationStatus).get(getDonationStatus)
router.route("/donationEachCategory").post(donationEachCategory)
router.route("/getDonationNeed").get(getDonationNeed)
router.route("/ngolist").get(ngolist)
router.route("/getDonarslist").get(getDonarslist)
router.route("/getNGOList").get(getNGOlist)
router.put("/approveNGO/:id", approveNGO);
router.put("/rejectNGO/:id", rejectNGO);
router.delete("/deleteNGO/:id", deleteNGO);
router.route("/getTotalDonationsPerMonth").post(getTotalDonationsPerMonth);
router.route("/getTotalDonationCount").get(getTotalDonationCount);
router.route("/getLastMonthDonationCount").get(getLastMonthDonationCount);
router.route("/getTotalDonorsCount").get(getTotalDonorsCount);
router.route("/getLatestDonors").get(getLatestDonors);


export default router;