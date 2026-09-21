const db = require('../config/database');

const TABLE = 'CategoriaProductos';
const ID_COLUMN = 'CatPro_id';

const obtenerCategoriaProductos = async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT * FROM ${TABLE}`);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener CategoriaProductos:', error);
        res.status(500).json({ mensaje: 'Error al consultar las categorías de productos' });
    }
};

const obtenerPorId = async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT * FROM ${TABLE} WHERE ${ID_COLUMN} = ?`,
            [req.params.id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ mensaje: 'Registro no encontrado' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener CategoriaProducto:', error);
        res.status(500).json({ mensaje: 'Error al consultar la categoría de producto' });
    }
};

const crear = async (req, res) => {
    const { nombre } = req.body || {};

    if (typeof nombre !== 'string' || nombre.trim() === '') {
        return res.status(400).json({ mensaje: 'El campo nombre es obligatorio' });
    }

    try {
        const [resultado] = await db.query(
            `INSERT INTO ${TABLE} (nombre) VALUES (?)`,
            [nombre.trim()]
        );

        res.status(201).json({
            mensaje: 'Registro creado',
            id: resultado.insertId
        });
    } catch (error) {
        console.error('Error al crear CategoriaProducto:', error);
        res.status(500).json({ mensaje: 'Error al crear la categoría de producto', detalle: error.message });
    }
};

const actualizar = async (req, res) => {
    const { nombre } = req.body || {};

    if (typeof nombre !== 'string' || nombre.trim() === '') {
        return res.status(400).json({ mensaje: 'El campo nombre es obligatorio' });
    }

    try {
        const [resultado] = await db.query(
            `UPDATE ${TABLE} SET nombre = ? WHERE ${ID_COLUMN} = ?`,
            [nombre.trim(), req.params.id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Registro no encontrado' });
        }

        res.json({
            mensaje: 'Registro actualizado',
            filasAfectadas: resultado.affectedRows
        });
    } catch (error) {
        console.error('Error al actualizar CategoriaProducto:', error);
        res.status(500).json({ mensaje: 'Error al actualizar la categoría de producto', detalle: error.message });
    }
};

const eliminar = async (req, res) => {
    try {
        const [resultado] = await db.query(
            `DELETE FROM ${TABLE} WHERE ${ID_COLUMN} = ?`,
            [req.params.id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Registro no encontrado' });
        }

        res.json({
            mensaje: 'Registro eliminado',
            filasAfectadas: resultado.affectedRows
        });
    } catch (error) {
        console.error('Error al eliminar CategoriaProducto:', error);
        res.status(500).json({ mensaje: 'Error al eliminar la categoría de producto', detalle: error.message });
    }
};

module.exports = {
    obtenerCategoriaProductos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};

