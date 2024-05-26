import express from 'express';
import morgan from 'morgan';
import routerCategory from "./category/routerCategory.js";
import routerFavorite from "./favorite/routerFavorite.js";
import routerHistory from "./history/routerHistory.js";
import routerMaintenance from "./maintenance/routerMaintenance.js";
import routerNewProduct from "./new_product/routerNewProduct.js";
import routerProductDetail from "./product_detail/routerProductDetail.js";
import routerSale from "./sale/routerSale.js";
import routerSponsor from "./sponsor/routerSponsor.js";

const app = express();
//throw new Error("Error de Prueba")

app.use(express.json());
app.use(morgan('short'));
app.use(express.static('public'));

app.use("/api/v1", routerCategory);
app.use("/api/v1", routerFavorite);
app.use("/api/v1", routerHistory);
app.use("/api/v1", routerMaintenance);
app.use("/api/v1", routerNewProduct);
app.use("/api/v1", routerProductDetail);
app.use("/api/v1", routerSale);
app.use("/api/v1", routerSponsor);
app.use('/photos', express.static('photos'));

app.use((request, response, next) =>{
    response.status(404).send(JSON.stringify({
        statusCode: 404,
        resultMessage: "API no encontrado"
    }));
});

export default app;