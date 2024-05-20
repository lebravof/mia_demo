import { pool } from '../../db.js';

export const readHistory = async (request, response) => {
    try {
        
        console.log('getUsersHistoryProducts')
        console.log(`Parametro: ${request.params.id}`)
        let myQuery = '';
        let rows = [];
        myQuery = 'SELECT P.id_producto, P.nombre_producto, C.nombre_categoria, I.image_path_location, H.fecha_consulta FROM tb_usuario_historial AS H ';
        myQuery = myQuery + 'JOIN tb_producto AS P ON P.id_producto = H.producto_id ';
        myQuery = myQuery + 'JOIN tb_producto_categoria AS C ON P.categoria_id = C.id_categoria ';
        myQuery = myQuery + 'JOIN tb_producto_imagen AS I ON P.id_producto = I.producto_id ';
        myQuery = myQuery + 'WHERE H.usuario_id = ? AND P.producto_suspendido = FALSE AND I.predeterminado = TRUE ';
        myQuery = myQuery + 'ORDER BY H.fecha_consulta DESC , P.nombre_producto ASC LIMIT 50';
        rows = await pool.query(myQuery, [request.params.id]);
        if (rows.length == 0) return response.status(404).json({
            message: "Historial no encontrado"
        })
        response.send(JSON.stringify(rows[0]));
    } catch (error) {
        return response.status(500).send(JSON.stringify({ "message": error.message }));
    }
};
