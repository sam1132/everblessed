import express from 'express';
import { addDonation,getDonations } from '../Controller/ngo.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post('/addDonation',authMiddleware, addDonation);
router.get('/getDonations', getDonations);
export default router;
