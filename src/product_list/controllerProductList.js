import { pool } from '../../db.js';

export const readProductListByName = async (request, response) => {
    try {
        //console.log('getProductsByName')
        //console.log(`Name: ${request.params.name}`)
        let myQuery = '';
        let rows = [];
        const name = request.params.name;
        myQuery =  'SELECT P.id_producto, P.nombre_producto, T.nombre_tienda, P.producto_patrocinado, ';
        myQuery = myQuery + 'P.producto_oferta, P.vencimiento_oferta, P.producto_nuevo, V.existencia_inventario, ';
        myQuery = myQuery + 'P.delivery, I.image_path_location, V.bs_precio_lista, V.bs_precio_oferta, ';
        myQuery = myQuery + 'V.ref_precio_lista, V.ref_precio_oferta, V.suma_calificaciones, V.total_usuarios ';
        myQuery = myQuery + 'FROM tb_producto AS P ';
        myQuery = myQuery + 'JOIN tb_producto_imagen AS I ON P.id_producto = I.producto_id  ';
        myQuery = myQuery + 'JOIN tb_producto_variacion AS V ON P.id_producto = V.producto_id ';
        myQuery = myQuery + 'JOIN tb_tienda AS T ON P.tienda_id = T.id_tienda ';
        myQuery = myQuery + 'WHERE (MATCH (P.nombre_producto) AGAINST (?) ';
        myQuery = myQuery + 'OR MATCH (P.descripcion_producto) AGAINST (?) ';
        myQuery = myQuery + 'OR P.nombre_producto LIKE ? OR P.descripcion_producto LIKE ?) ';
        myQuery = myQuery + 'AND V.variacion_predeterminada = TRUE AND P.producto_suspendido = FALSE AND I.predeterminado = TRUE ';
        myQuery = myQuery + 'ORDER BY P.nombre_producto ASC LIMIT 50 ';
        rows = await pool.query(myQuery, [name, name, '%'+ name + '%', '%'+ name + '%']);
        if (rows.length == 0) return response.status(404).send(JSON.stringify({
            message: "No Productos"
        }));
        response.send(JSON.stringify(rows[0]));
    } catch (error) {
        return response.status(500).send(JSON.stringify({ "message": error.message }));
    }
};
