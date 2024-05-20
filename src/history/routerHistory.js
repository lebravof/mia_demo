import {Router} from 'express';
import {readHistory} from './controllerHistory.js';

const router = Router();

router.get('/history/:id', readHistory);

export default router;