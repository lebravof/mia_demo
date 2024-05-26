import {Router} from 'express';
import {readSponsor} from './controllerSponsor.js';

const routerSponsor = Router();

routerSponsor.get('/sponsor', readSponsor);

export default routerSponsor;