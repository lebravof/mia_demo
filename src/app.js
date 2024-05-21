import express from 'express';
import morgan from 'morgan';
//import routerCategory from './category/routerCategory.js';
//import routerFavorite from './favorite/routerFavorite.js';
//import routerHistory from './history/routerHistory.js';
//import routerMaintenance from './maintenance/routerMaintenance.js';
//import routerNewProduct from './new_product/routerNewProduct.js';
//import routerProductDetail from './product_detail/routerProductDetail.js';
//import routerSale from './sale/routerSale.js';
//import routerSponsor from './sponsor/routerSponsor.js';

import { API } from '../config.js';
//throw new Error("Error de Prueba")
const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('public'));

//app.use(API, routerCategory);
//app.use(API, routerFavorite);
//app.use(API, routerHistory);
//app.use(API, routerMaintenance);
//app.use(API, routerNewProduct);
//app.use(API, routerProductDetail);
//app.use(API, routerSale);
//app.use(API, routerSponsor);
app.use('/photos', express.static('photos'));

app.use((request, response, next) =>{
    response.status(404).send(JSON.stringify({
        statusCode: 404,
        resultMessage: "API no encontrado"
    }));
});

export default app;