import {Router} from 'express';
import {readFavorite} from './controllerFavorite.js';

const router = Router();

router.get('/favorite/:id', readFavorite);

export default router;