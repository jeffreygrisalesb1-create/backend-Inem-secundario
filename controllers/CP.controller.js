const db = require('../config/database');

// Obtener todos los grupos
const obtenerCP = async (req, res) => {

    try {

        const [rows] = await db.query(
            'SELECT * FROM CP'
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
    obtenerCP
};

const obtenerPorId = async (req, res) => {
    try {
    const { id } = req.params;
    const [rows] = await db.query(
    'SELECT * FROM codigos_postales WHERE CP_id = ?',
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
    codigo,
    codCiudad
    } = req.body;
    const [resultado] = await db.query(`
    INSERT INTO codigos_postales
    (
    codigo, codCiudad
    )
    VALUES (?, ?)
    `,
    [
    codigo, codCiudad
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
    codigo,
    codCiudad
    } = req.body;
    const [resultado] = await db.query(`
    UPDATE codigos_postales
    SET
    codigo=?,
    codCiudad=?
    WHERE codCP=?
    `,
    [
    codigo, codCiudad,
    id
    ]);
    
    12
    
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
    'DELETE FROM codigos_postales WHERE codCP = ?',
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
    obtenerCP,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
    };