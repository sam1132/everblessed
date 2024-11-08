import express from 'express';
import { register } from '../Controller/user.controller';
const router = express.Router();
router.post('/api/register', register);