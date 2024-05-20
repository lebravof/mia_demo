import { pool } from '../../db.js';

export const readFavorite= async (request, response) => {
    try {
        console.log('getUsersFavoriteProducts');
        console.log(`Parametro: ${request.params.id}`);
        let myQuery = '';
        let rows = [];
        myQuery = 'SELECT P.id_producto, P.nombre_producto, P.producto_patrocinado, P.producto_oferta, P.vencimiento_oferta, P.producto_nuevo, ';
        myQuery = myQuery + 'V.existencia_inventario, P.delivery, I.image_path_location, V.bs_precio_lista, V.bs_precio_oferta, ';
        myQuery = myQuery + 'V.ref_precio_lista, V.ref_precio_oferta, V.total_rating, V.total_usuario ';
        myQuery = myQuery + 'FROM tb_usuario_favorito AS F ';
        myQuery = myQuery + 'JOIN tb_producto AS P ON P.id_producto = F.producto_id ';
        myQuery = myQuery + 'JOIN tb_producto_imagen AS I ON P.id_producto = I.producto_id ';
        myQuery = myQuery + 'JOIN tb_producto_variacion AS V ON P.id_producto = V.producto_id ';
        myQuery = myQuery + 'WHERE F.usuario_id = ? AND V.variacion_predeterminada = TRUE AND P.producto_suspendido = FALSE AND I.predeterminado = TRUE ';
        myQuery = myQuery + 'ORDER BY P.producto_consultado DESC , P.nombre_producto ASC LIMIT 50';
        rows = await pool.query(myQuery, [request.params.id]);
        if (rows.length == 0) return response.status(404).json({
            message: "Favoritos no encontrados"
        });
        response.send(JSON.stringify(rows[0]));
    } catch (error) {
        return response.status(500).send(JSON.stringify({ "message": error.message }));
    }
};
