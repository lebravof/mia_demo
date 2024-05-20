import { pool } from '../../db.js';

export const readSale= async (request, response) => {
    try {
        console.log('getSaleProducts')
        let myQuery = '';
        let rows = [];
        myQuery = 'SELECT P.id_producto, P.nombre_producto, T.nombre_tienda, I.image_path_location, V.bs_precio_lista, ';
        myQuery = myQuery + 'V.bs_precio_oferta, V.ref_precio_lista, V.ref_precio_oferta, V.total_rating, V.total_usuario ';
        myQuery = myQuery + 'FROM tb_producto AS P ';
        myQuery = myQuery + 'JOIN tb_producto_imagen AS I ON P.id_producto = I.producto_id ';
        myQuery = myQuery + 'JOIN tb_producto_variacion AS V ON P.id_producto = V.producto_id ';
        myQuery = myQuery + 'JOIN tb_tienda AS T ON P.tienda_id = T.id_tienda ';
        myQuery = myQuery + 'WHERE P.producto_oferta = TRUE AND V.variacion_predeterminada = TRUE ';
        myQuery = myQuery + 'AND P.producto_suspendido = FALSE AND I.predeterminado = TRUE ';
        myQuery = myQuery + 'ORDER BY P.producto_modificado DESC , P.nombre_producto ASC LIMIT 50 ';
        rows = await pool.query(myQuery);
        if (rows.length == 0) return response.status(404).json({
            message: "No hay Productos en Oferta"
        });
        response.send(JSON.stringify(rows[0]));
    } catch (error) {
        return response.status(500).send(JSON.stringify({ "message": error.message }));
    }
};
