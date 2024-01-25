import express from 'express';
import {authAdmin, logoutAdmin, getAdminProfile, updateAdminProfile, registerAdmin} from '../controllers/adminController.js'

import {protect } from '../middleware/authMiddlewareAdmin.js'
const router = express.Router()

router.post('/auth', authAdmin)
router.post('/', registerAdmin)
router.post('/logout', logoutAdmin)
router.get('/profile', protect, getAdminProfile)
router.post('/update', updateAdminProfile)

export default router 
