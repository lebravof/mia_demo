import {Router} from 'express';
import {readProductListByName} from './controllerProductList.js';

const routerProductList = Router();

routerProductList.get('/productsbyname/:name', readProductListByName);

export default routerProductList;