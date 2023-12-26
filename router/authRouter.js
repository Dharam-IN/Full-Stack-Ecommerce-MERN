import express from 'express';
import { registerControllers } from '../controllers/authControllers.js';

const router = express.Router();


// REGISTER AUTH 
router.post('/register', registerControllers)

export default router;