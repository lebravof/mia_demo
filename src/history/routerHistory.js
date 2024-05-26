import {Router} from 'express';
import {readHistory} from './controllerHistory.js';

const routerHistory = Router();

routerHistory.get('/history/:id', readHistory);

export default routerHistory;