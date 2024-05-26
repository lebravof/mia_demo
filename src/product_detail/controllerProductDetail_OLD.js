import { pool } from '../../db.js';

export const readProductDetail = async (request, response) => {
    try {
        console.log('getProduct');
        console.log(`idProduct: ${request.params.idProduct}`);
        console.log(`idUser: ${request.params.idUser}`);
        const id_producto = request.params.idProduct;
        const id_user = request.params.idUser;
        let myQuery = '';
        let rows = null;
        // SQL del Producto para variación PREDETERMINADA (idVariation = 0)ø
        myQuery = 'SELECT P.id_producto, P.nombre_producto, descripcion_producto, T.id_tienda, T.nombre_tienda, ';
        myQuery = myQuery + 'M.nombre_marca, C.nombre_categoria, P.producto_patrocinado, P.producto_oferta, ';
        myQuery = myQuery + 'P.vencimiento_oferta, P.producto_nuevo, V.existencia_inventario, P.ofrece_delivery, ';
        myQuery = myQuery + 'CASE WHEN EXISTS(SELECT 1 FROM tb_usuario_favorito WHERE usuario_id = ? AND producto_id = ?) THEN 1 ELSE 0 END favorite, ';
        myQuery = myQuery + 'V.bs_precio_lista, V.bs_precio_oferta, V.ref_precio_lista, V.ref_precio_oferta, ';
        myQuery = myQuery + 'V.suma_calificaciones, V.total_usuarios ';
        myQuery = myQuery + 'FROM tb_producto AS P ';
        myQuery = myQuery + 'JOIN tb_tienda AS T ON P.tienda_id = T.id_tienda ';
        myQuery = myQuery + 'JOIN tb_producto_marca AS M ON P.marca_id = M.id_marca ';
        myQuery = myQuery + 'JOIN tb_producto_categoria AS C ON P.categoria_id = C.id_categoria ';
        myQuery = myQuery + 'JOIN tb_producto_variacion AS V ON P.id_producto = V.producto_id ';
        myQuery = myQuery + 'WHERE P.id_producto = ? AND P.producto_suspendido = FALSE AND V.variacion_predeterminada = TRUE';
        rows = await pool.query(myQuery, [id_user, id_producto, id_producto]);
        if (rows.length == 0) return response.status(404).json({
            message: "No existe el Producto"
        });
        let productoROW = JSON.parse(JSON.stringify(rows[0]));
        var producto = '';
        productoROW.forEach((element, index) => {
            producto = element
        });
        //Busqueda de id_producto_variacion del producto
        myQuery = '';
        rows = '';
        myQuery = 'SELECT id_producto_variacion FROM tb_producto_variacion WHERE producto_id = ? AND variacion_predeterminada = TRUE';
        rows = await pool.query(myQuery, [request.params.idProduct]);
        const { id_producto_variacion } = rows[0][0];
        console.log(`id_producto_variacion: ${id_producto_variacion}`);
        // Busqueda de las medidas
        myQuery = '';
        rows = null;
        myQuery = 'SELECT MN.medida_nombre, MV.valor_medida, MN.sin_medida ';
        myQuery = myQuery + 'FROM tb_producto_medida AS PM ';
        myQuery = myQuery + 'JOIN tb_medida_valor AS MV ON PM.medida_valor_id = MV.id_medida_valor ';
        myQuery = myQuery + 'JOIN tb_medida_nombre AS MN ON MN.id_medida_nombre = MV.medida_nombre_id ';
        myQuery = myQuery + 'WHERE producto_variacion_id = ?';
        rows = await pool.query(myQuery, [id_producto_variacion]);
        if (rows[0].length != 0) {
            producto.measures = rows[0];
        } else {
            producto.measures = [];
        }
        //Busqueda del Carrusel de imagenes del Producto
        myQuery = '';
        rows = null;
        myQuery = 'SELECT image_path_location FROM tb_producto_imagen WHERE producto_id = ? ORDER BY ordenamiento';
        rows = await pool.query(myQuery, [id_producto]);
        if (rows[0].length != 0) {
            producto.images = rows[0];
        } else {
            producto.images = [];
        }
        //Busqueda de las Variaciones
        myQuery = '';
        rows = null;
        myQuery = 'SELECT id_producto_variacion, variacion_predeterminada, image_path_location, C.nombre_color ';
        myQuery = myQuery + 'FROM tb_producto_variacion AS V ';
        myQuery = myQuery + 'JOIN tb_producto_color AS C ON V.color_id = C.id_color ';
        myQuery = myQuery + 'WHERE producto_id = ?';
        rows = await pool.query(myQuery, [id_producto]);
        if (rows[0].length != 0) {
            producto.variations = rows[0];
        } else {
            producto.variations = [];
        }
        //Busqueda de las secciones
        myQuery = '';
        rows = null;
        myQuery = 'SELECT titulo_seccion, descripcion_seccion, ordenamiento ';
        myQuery = myQuery + 'FROM tb_producto_seccion ';
        myQuery = myQuery + 'WHERE producto_id = ? ORDER BY ordenamiento';
        rows = await pool.query(myQuery, [id_producto]);
        if (rows[0].length != 0) {
            producto.sections = rows[0];
        } else {
            producto.sections = [];
        }
        response.send(JSON.stringify(producto));
    } catch (error) {
        return response.status(500).send(JSON.stringify({ "Error Inesperado": error.message }));
    }
};

export const readProductVariation = async (request, response) => {
    try {
        console.log('getProductVariation');
        console.log(`idVariation: ${request.params.idVariation}`);
        let myQuery = '';
        let rows = null;
        // Busqueda de los datos de la Variacion
        myQuery = 'SELECT bs_precio_lista, bs_precio_oferta, ref_precio_lista, ref_precio_oferta, ';
        myQuery = myQuery + 'suma_calificaciones, total_usuarios ';
        myQuery = myQuery + 'FROM tb_producto_variacion ';
        myQuery = myQuery + 'WHERE id_producto_variacion = ?';
        rows = await pool.query(myQuery, [request.params.idVariation]);
        if (rows.length == 0) return response.status(404).json({
            message: "No existe la Variacion del Producto"
        });
        let variationROW = JSON.parse(JSON.stringify(rows[0]));
        var variation = '';
        variationROW.forEach((element, index) => {
            variation = element
        });
        // Busqueda de las medidas de la variacion
        myQuery = '';
        rows = null;
        myQuery = 'SELECT MN.medida_nombre, MV.valor_medida, MN.sin_medida ';
        myQuery = myQuery + 'FROM tb_producto_medida AS PM ';
        myQuery = myQuery + 'JOIN tb_medida_valor AS MV ON PM.medida_valor_id = MV.id_medida_valor ';
        myQuery = myQuery + 'JOIN tb_medida_nombre AS MN ON MN.id_medida_nombre = MV.medida_nombre_id ';
        myQuery = myQuery + 'WHERE producto_variacion_id = ?';
        rows = await pool.query(myQuery, [request.params.idVariation]);
        if (rows[0].length != 0) {
            variation.measures = rows[0];
        } else {
            variation.measures = [];
        }
        response.send(JSON.stringify(variation));
    } catch (error) {
        return response.status(500).send(JSON.stringify({ "Error Inesperado": error.message }));
    }
};
