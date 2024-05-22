import { pool } from "../../db.js";
import { fecha } from "../utilities/fecha.js";

export const ping = async (req, res) => {
    try {
        console.log(`${fecha()} - ping`);
        const [result] = await pool.query('SELECT 1+1 AS result');
        let myQuery = '';
        let rows = null;
        myQuery = 'SELECT name FROM tb_prueba WHERE id = 1';
        rows = await pool.query(myQuery, [1]);
        console.log(JSON.stringify(rows[0]));
        res.status(200).send(JSON.stringify(rows[0]));
        console.log('ping 200');
    } catch (error) {
        return res.status(500).send(JSON.stringify({ "errorMessage": error.message  }));
    }
};

export const readMaintenance = async (request, response) => {
    try {
        console.log('readMaintenance');
        const maintenance = { 'status': false, 'message': "" };
        const [rows] = await pool.query('SELECT bolParametro FROM tb_parametro WHERE id_parametro = 1');
        maintenance.status = rows[0].bolParametro;
        console.log(`maintenance.status: ${maintenance.status}`);
        if (maintenance.status == true) {
            const [rows] = await pool.query('SELECT descripcion_mensaje FROM tb_mantenimiento WHERE mensaje_predeterminado = 1');
            console.log(rows[0]);
            maintenance.message = rows[0].descripcion_mensaje;
        }
        return response.status(200).send(JSON.stringify(maintenance));
    } catch (error) {
        return response.status(500).send(JSON.stringify({ "message": error.message }));
    }
};
