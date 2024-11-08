import express from 'express';
import { register } from '../Controller/user.controller.js';
const router = express.Router();
router.post('/api/register', register);

export default router;