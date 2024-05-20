import {Router} from 'express';
import {readNewProduct} from './controllerNewProduct.js';

const router = Router();

router.get('/newproduct', readNewProduct);

export default router;