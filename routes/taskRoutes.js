import express from 'express';
import {
getTaskById,
createTask,
addComment,
getCommentsForTask
} from '../controllers/taskController.js';

const router = express.Router();

router.get('/:id', getTaskById);
router.post('/', createTask);
router.post('/:id/comments', addComment);
router.get('/:id/comments', getCommentsForTask);

export default router;