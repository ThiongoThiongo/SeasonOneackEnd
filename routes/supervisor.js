import express from 'express';
import { authSupervisor,  logoutSupervisor, registerSupervisor
    , deleteSupervisorProfile, getAllSupervisor} from '../controllers/supervisorController.js'
import {protect } from '../middleware/authMiddlewareAdmin.js';

const router = express.Router()

router.post('/', protect,  registerSupervisor)
router.get('/', protect, getAllSupervisor)
router.post('/auth', authSupervisor)
router.post('/logout', logoutSupervisor)
router.post('/delete', protect, deleteSupervisorProfile)

export default router 
