import express from 'express';
import {
getAllUsers,
createUser,
getMembersByProjectId
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/project/:id/members', getMembersByProjectId);

export default router;