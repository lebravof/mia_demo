import {Router} from 'express';
import {readNewProduct} from './controllerNewProduct.js';

const routerNewProduct = Router();

routerNewProduct.get('/newproduct', readNewProduct);

export default routerNewProduct;