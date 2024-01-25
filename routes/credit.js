import express from 'express';
import {addCredit, getAllDatas, updateCredit} from '../controllers/creditController.js'
import { protect } from '../middleware/authMiddlewareAdmin.js';

const router = express.Router()

router.post('/', protect, addCredit)
router.get('/', protect, getAllDatas)
router.post('/update', protect,updateCredit)

export default router 
