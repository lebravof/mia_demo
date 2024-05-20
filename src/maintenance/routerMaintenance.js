import {Router} from 'express';
import {ping, readMaintenance} from './controllerMaintenance.js';

const router = Router();

router.get('/ping', ping);

router.get('/maintenance', readMaintenance);

export default router;