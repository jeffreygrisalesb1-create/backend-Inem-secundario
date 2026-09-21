const db = require('../config/database');

const createCrudController = ({ table, idColumn, fields, resource }) => {
    const selectAll = async (req, res) => {
        try {
            const [rows] = await db.query(`SELECT * FROM ${table}`);
            res.json(rows);
        } catch (error) {
            console.error(`Error al listar ${resource}:`, error);
            res.status(500).json({ mensaje: `Error al listar ${resource}` });
        }
    };

    const selectById = async (req, res) => {
        try {
            const [rows] = await db.query(
                `SELECT * FROM ${table} WHERE ${idColumn} = ?`,
                [req.params.id]
            );
            if (rows.length === 0) {
                return res.status(404).json({ mensaje: 'Registro no encontrado' });
            }
            res.json(rows[0]);
        } catch (error) {
            console.error(`Error al consultar ${resource}:`, error);
            res.status(500).json({ mensaje: `Error al consultar ${resource}` });
        }
    };

    const create = async (req, res) => {
        const values = fields.map((field) => req.body?.[field]);
        try {
            const [result] = await db.query(
                `INSERT INTO ${table} (${fields.join(', ')}) VALUES (${fields.map(() => '?').join(', ')})`,
                values
            );
            res.status(201).json({ mensaje: 'Registro creado', id: result.insertId });
        } catch (error) {
            console.error(`Error al crear ${resource}:`, error);
            res.status(500).json({ mensaje: `Error al crear ${resource}`, detalle: error.message });
        }
    };

    const update = async (req, res) => {
        const values = fields.map((field) => req.body?.[field]);
        try {
            const [result] = await db.query(
                `UPDATE ${table} SET ${fields.map((field) => `${field} = ?`).join(', ')} WHERE ${idColumn} = ?`,
                [...values, req.params.id]
            );
            if (result.affectedRows === 0) {
                return res.status(404).json({ mensaje: 'Registro no encontrado' });
            }
            res.json({ mensaje: 'Registro actualizado', filasAfectadas: result.affectedRows });
        } catch (error) {
            console.error(`Error al actualizar ${resource}:`, error);
            res.status(500).json({ mensaje: `Error al actualizar ${resource}`, detalle: error.message });
        }
    };

    const remove = async (req, res) => {
        try {
            const [result] = await db.query(
                `DELETE FROM ${table} WHERE ${idColumn} = ?`,
                [req.params.id]
            );
            if (result.affectedRows === 0) {
                return res.status(404).json({ mensaje: 'Registro no encontrado' });
            }
            res.json({ mensaje: 'Registro eliminado', filasAfectadas: result.affectedRows });
        } catch (error) {
            console.error(`Error al eliminar ${resource}:`, error);
            res.status(500).json({ mensaje: `Error al eliminar ${resource}`, detalle: error.message });
        }
    };

    return { selectAll, selectById, create, update, remove };
};

module.exports = createCrudController;
