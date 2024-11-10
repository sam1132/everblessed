import express from 'express';
import { addDonation } from '../Controller/ngo.controller.js';
const router = express.Router();

router.post('/addDonation', addDonation);

export default router;
