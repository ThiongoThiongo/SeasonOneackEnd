 import express from 'express';
 import {authAgent, registerAgent, logoutAgent, getAgentProfile, updateAgentProfile, deleteAgentProfile , getAllAgents} from '../controllers/agentController.js'

 import {protect } from '../middleware/authMiddlewareAdmin.js';

const router = express.Router()

router.post('/', registerAgent)
router.get('/', protect,  getAllAgents)
router.post('/auth', authAgent)
router.post('/logout', logoutAgent)
router.get('/profile', protect, getAgentProfile)
router.post('/profile', protect, updateAgentProfile)
router.post('/delete', protect, deleteAgentProfile)

export default router 
