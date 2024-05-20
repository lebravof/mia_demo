import {Router} from 'express';
import {readCategory, readProductsByCategory} from './controllerCategory.js';

const router = Router();

router.get('/category/:id', readCategory);
router.get('/productsbycategory/:id', readProductsByCategory);

export default router;