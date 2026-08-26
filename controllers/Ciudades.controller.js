const db = require('../config/database');

// Obtener todos los grupos
const obtenerCiudades = async (req, res) => {

    try {

        const [rows] = await db.query(
            'SELECT * FROM Ciudades'
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
    obtenerCiudades
};

const obtenerPorId = async (req, res) => {
    try {
    const { id } = req.params;
    const [rows] = await db.query(
    'SELECT * FROM ciudades WHERE codCiudad = ?',
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
    codDepartamento
    } = req.body;
    
    5
    
    const [resultado] = await db.query(`
    INSERT INTO ciudades
    (
    nombre, codDepartamento
    )
    VALUES (?, ?)
    `,
    [
    nombre, codDepartamento
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
    codDepartamento
    } = req.body;
    const [resultado] = await db.query(`
    UPDATE ciudades
    SET
    nombre=?,
    codDepartamento=?
    WHERE codCiudad=?
    `,
    [
    nombre, codDepartamento,
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
    'DELETE FROM ciudades WHERE codCiudad = ?',
    [id]
    );
    res.json({
    mensaje: 'Registro eliminado',
    filasAfectadas: resultado.affectedRows
    });
    
    6
    
    } catch (error) {
    console.error(error);
    res.status(500).json({
    mensaje: 'Error al eliminar'
    });
    }
    };
    module.exports = {
    obtenerCiudades,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
    };