import express from 'express';
import {addClient, getClientResponses, updateResponse} from '../controllers/clientResponseController.js'
import { protect } from '../middleware/authMiddlewareAdmin.js';

const router = express.Router()

router.post('/', addClient)
router.get('/', protect,getClientResponses)
router.post('/update', protect,updateResponse)

export default router 
