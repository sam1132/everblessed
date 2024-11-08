import express from 'express';
import { login } from '../Controller/login.controller';
const router = express.Router();
router.post('/api/login', login);