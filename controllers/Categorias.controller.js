const db = require('../config/database');

// Obtener todos los grupos
const obtenerCategorias = async (req, res) => {

    try {

        const [rows] = await db.query(
            'SELECT * FROM Categorias'
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
    obtenerCategorias
};

const obtenerPorId = async (req, res) => {
    try {
    const { id } = req.params;
    const [rows] = await db.query(
    'SELECT * FROM categorias WHERE codCategoria = ?',
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
    descripcion
    } = req.body;
    const [resultado] = await db.query(`
    INSERT INTO categorias
    (
    
    3
    
    nombre, descripcion
    )
    VALUES (?, ?)
    `,
    [
    nombre, descripcion
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
    descripcion
    } = req.body;
    const [resultado] = await db.query(`
    UPDATE categorias
    SET
    nombre=?,
    descripcion=?
    WHERE codCategoria=?
    `,
    [
    nombre, descripcion,
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
    'DELETE FROM categorias WHERE codCategoria = ?',
    [id]
    );
    res.json({
    mensaje: 'Registro eliminado',
    filasAfectadas: resultado.affectedRows
    });
    } catch (error) {
    console.error(error);
    res.status(500).json({
    
    });
    }
    4
    
    mensaje: 'Error al eliminar'
   
    };
    module.exports = {
    obtenerCategorias,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
    };