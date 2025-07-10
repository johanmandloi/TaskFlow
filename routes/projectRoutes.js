import express from 'express';

import {
getAllProjects,
getProjectById,
getProjectAnalytics,
createProject
} from '../controllers/projectController.js';

const router = express.Router();

router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.post('/', createProject);
router.get('/:id/analytics', getProjectAnalytics);

export default router;