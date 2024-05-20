import {Router} from 'express';
import {readSponsor} from './controllerSponsor.js';

const router = Router();

router.get('/sponsor', readSponsor);

export default router;