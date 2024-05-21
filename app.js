import express from 'express';
import morgan from 'morgan';
import routerCategory from './src/category/routerCategory.js';
import routerFavorite from './src/favorite/routerFavorite.js';
import routerHistory from './src/history/routerHistory.js';
import routerMaintenance from './src/maintenance/routerMaintenance.js';
import routerNewProduct from './src/new_product/routerNewProduct.js';
import routerProductDetail from './src/product_detail/routerProductDetail.js';
import routerSale from './src/sale/routerSale.js';
import routerSponsor from './src/sponsor/routerSponsor.js';

import { API, PORT } from './config.js';

const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('public'));

app.use(API, routerCategory);
app.use(API, routerFavorite);
app.use(API, routerHistory);
app.use(API, routerMaintenance);
app.use(API, routerNewProduct);
app.use(API, routerProductDetail);
app.use(API, routerSale);
app.use(API, routerSponsor);
app.use('/photos', express.static('photos'));

app.use((request, response, next) =>{
    response.status(404).send(JSON.stringify({
        statusCode: 404,
        resultMessage: "API no encontrado"
    }));
});

app.listen(PORT, () => {
    console.log(`Running Express Server on Port ${PORT}`);
});