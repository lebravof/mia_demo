import {Router} from 'express';
import {readSale} from './controllerSale.js';

const router = Router();

router.get('/sale', readSale);

export default router;