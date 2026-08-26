const db = require('../config/database');

// Obtener todos los grupos
const obtenerProductos = async (req, res) => {

    try {

        const [rows] = await db.query(
            'SELECT * FROM Productos'
        );

        res.json(rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error del servidor'
        });

    }

};

module.exports = {
    obtenerProductos
};

const obtenerPorId = async (req, res) => {
    try {
    const { id } = req.params;
    const [rows] = await db.query(
    'SELECT * FROM productos WHERE codProducto = ?',
    [id]
    );
    if (rows.length === 0) {
    return res.status(404).json({
    mensaje: 'Registro no encontrado'
    });
    }
    res.json(rows[0]);
    } catch (error) {
    console.error(error);
    res.status(500).json({
    mensaje: 'Error del servidor'
    });
    }
    };
    // ===================================
    // Crear
    // ===================================
    const crear = async (req, res) => {
    try {
    const {
    nombre,
    descripcion,
    precio,
    stock,
    codCategoria
    } = req.body;
    const [resultado] = await db.query(`
    
    22
    
    INSERT INTO productos
    (
    nombre, descripcion, precio, stock, codCategoria
    )
    VALUES (?, ?, ?, ?, ?)
    `,
    [
    nombre, descripcion, precio, stock, codCategoria
    ]);
    res.status(201).json({
    mensaje: 'Registro creado',
    id: resultado.insertId
    });
    } catch (error) {
    console.error(error);
    res.status(500).json({
    mensaje: 'Error al crear'
    });
    }
    };
    // ===================================
    // Actualizar
    // ===================================
    const actualizar = async (req, res) => {
    try {
    const { id } = req.params;
    const {
    nombre,
    descripcion,
    precio,
    stock,
    codCategoria
    } = req.body;
    const [resultado] = await db.query(`
    UPDATE productos
    SET
    nombre=?,
    descripcion=?,
    precio=?,
    stock=?,
    codCategoria=?
    WHERE codProducto=?
    `,
    [
    nombre, descripcion, precio, stock, codCategoria,
    id
    ]);
    res.json({
    mensaje: 'Registro actualizado',
    filasAfectadas: resultado.affectedRows
    });
    } catch (error) {
    console.error(error);
    res.status(500).json({
    mensaje: 'Error al actualizar'
    });
    }
    };
    // ===================================
    // Eliminar
    // ===================================
    const eliminar = async (req, res) => {
    try {
    const { id } = req.params;
    const [resultado] = await db.query(
    'DELETE FROM productos WHERE codProducto = ?',
    [id]
    );
    res.json({
    mensaje: 'Registro eliminado',
    filasAfectadas: resultado.affectedRows
    });
    } catch (error) {
    console.error(error);
    res.status(500).json({
    mensaje: 'Error al eliminar'
    });
    }
    };
    module.exports = {
    obtenerProductos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
    };