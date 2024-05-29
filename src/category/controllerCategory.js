import { pool } from '../../db.js';

export const readCategory = async (request, response) => {
    try {
        //console.log('getCategory')
        //console.log(`Parametro: ${request.params.id}`)
        let myQuery = '';
        let rows = [];
        const id_category = parseInt(request.params.id);
        if (isNaN(request.params.id)) {
            id_category = 0;
        };
        if (id_category == 0) {
            myQuery = 'SELECT id_categoria, nombre_categoria, image_path_location ';
            myQuery = myQuery + 'FROM tb_producto_categoria WHERE categoria_padre_id IS NULL ';
            myQuery = myQuery + 'ORDER BY nombre_categoria ASC LIMIT 50';
            rows = await pool.query(myQuery);
        } else {
            myQuery = 'SELECT SUP.id_categoria, SUP.nombre_categoria, SUP.image_path_location ';
            myQuery = myQuery + 'FROM tb_producto_categoria AS C ';
            myQuery = myQuery + 'INNER JOIN tb_producto_categoria AS SUP ON SUP.categoria_padre_id = C.id_categoria ';
            myQuery = myQuery + 'WHERE SUP.categoria_padre_id = ? ORDER BY nombre_categoria ASC LIMIT 50';
            rows = await pool.query(myQuery, [id_category]);
        }
        if (rows.length == 0) return response.status(404).send(JSON.stringify({
            message: "No hay Categoria de Productos"
        }));
        response.send(JSON.stringify(rows[0]));
    } catch (error) {
        return response.status(500).send(JSON.stringify({ "message": error.message }));
    }
};

export const readProductsByCategory = async (request, response) => {
    try {
        //console.log('getProductsByCategory')
        //console.log(`Categoria: ${request.params.id}`)
        let myQuery = '';
        let rows = [];
        const id_category = parseInt(request.params.id);
        if (!isNaN(id_category)) {
            myQuery = 'SELECT P.id_producto, P.nombre_producto, T.nombre_tienda, P.producto_patrocinado, ';
            myQuery = myQuery + 'P.producto_oferta, P.vencimiento_oferta, P.producto_nuevo, V.existencia_inventario, ';
            myQuery = myQuery + 'P.delivery, I.image_path_location, V.bs_precio_lista, V.bs_precio_oferta, ';
            myQuery = myQuery + 'V.ref_precio_lista, V.ref_precio_oferta, V.suma_calificaciones, V.total_usuarios ';
            myQuery = myQuery + 'FROM tb_producto AS P ';
            myQuery = myQuery + 'JOIN tb_producto_categoria AS C ON P.categoria_id = C.id_categoria ';
            myQuery = myQuery + 'JOIN tb_producto_imagen AS I ON P.id_producto = I.producto_id ';
            myQuery = myQuery + 'JOIN tb_producto_variacion AS V ON P.id_producto = V.producto_id ';
            myQuery = myQuery + 'JOIN tb_tienda AS T ON P.tienda_id = T.id_tienda ';
            myQuery = myQuery + 'WHERE P.categoria_id = ? ';
            myQuery = myQuery + 'AND V.variacion_predeterminada = TRUE AND P.producto_suspendido = FALSE AND I.predeterminado = TRUE ';
            myQuery = myQuery + 'ORDER BY P.nombre_producto ASC LIMIT 50 ';
            rows = await pool.query(myQuery, [id_category]);
        } else {
            return response.status(404).send(JSON.stringify({
                message: "Categoria inválida"
            }));
        }
        if (rows.length == 0) return response.status(404).send(JSON.stringify({
            message: "No hay Categoria de Productos"
        }));
        response.send(JSON.stringify(rows[0]));
    } catch (error) {
        return response.status(500).send(JSON.stringify({ "message": error.message }));
    }
};
