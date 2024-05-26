import {Router} from 'express';
import {readProductDetail} from './controllerProductDetail.js';

const routerProductDetail = Router();

routerProductDetail.get('/product/:idProduct/user/:idUser/variation/:idVariation', readProductDetail);
//routerProductDetail.get('/productvariation/:idVariation', readProductVariation);

export default routerProductDetail;