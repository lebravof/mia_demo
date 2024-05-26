import {Router} from 'express';
import {readSale} from './controllerSale.js';

const routerSale = Router();

routerSale.get('/sale', readSale);

export default routerSale;