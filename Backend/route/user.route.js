import express from 'express';
import { register,login } from '../Controller/user.controller.js';
const router = express.Router();
router.post('/api/user/register', register);
router.post('/api/user/login', login);

export default router;
