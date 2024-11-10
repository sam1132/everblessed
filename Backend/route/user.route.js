import express from 'express';
import { register,login,ngoRegister } from '../Controller/user.controller.js';
const router = express.Router();
router.post('/register', register);
router.post('/ngo-register', ngoRegister);
router.post('/login', login);

export default router;
