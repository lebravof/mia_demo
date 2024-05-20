import {Router} from 'express';
import {readProductDetail} from './controllerProductDetail.js';

const router = Router();

router.get('/product/:idProduct/user/:idUser/variation/:idVariation', readProductDetail);
//router.get('/productvariation/:idVariation', readProductVariation);

export default router;