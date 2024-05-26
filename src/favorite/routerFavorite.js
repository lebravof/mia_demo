import {Router} from 'express';
import {readFavorite} from './controllerFavorite.js';

const routerFavorite = Router();

routerFavorite.get('/favorite/:id', readFavorite);

export default routerFavorite;