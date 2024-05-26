import {Router} from 'express';
import {readCategory, readProductsByCategory} from './controllerCategory.js';

const routerCategory = Router();

routerCategory.get('/category/:id', readCategory);
routerCategory.get('/productsbycategory/:id', readProductsByCategory);

export default routerCategory;