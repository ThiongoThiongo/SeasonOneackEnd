import express from 'express';
import { getAllDatas, addData, updateRemarkOrState, deleteCardInfo} from '../controllers/original.js';

import { protect } from '../middleware/authMiddlewareAdmin.js';
const router = express.Router()

router.get('/',  getAllDatas)
router.post('/',  addData)
router.post('/delete',  deleteCardInfo)

router.post('/update',  updateRemarkOrState)
export default router 
