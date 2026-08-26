const db = require('../config/database');

// Obtener todos los grupos
const obtenerCv = async (req, res) => {

    try {

        const [rows] = await db.query(
            'SELECT * FROM Cv'
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
    obtenerCv
};

const obtenerPorId = async (req, res) => {

    13
    
    try {
    const { id } = req.params;
    const [rows] = await db.query(
    'SELECT * FROM hojas_vida WHERE codCv = ?',
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
    codEmpleado,
    descripcion,
    archivoUrl
    } = req.body;
    const [resultado] = await db.query(`
    INSERT INTO hojas_vida
    (
    codEmpleado, descripcion, archivoUrl
    )
    VALUES (?, ?, ?)
    `,
    [
    codEmpleado, descripcion, archivoUrl
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
    codEmpleado,
    descripcion,
    archivoUrl
    } = req.body;
    const [resultado] = await db.query(`
    UPDATE hojas_vida
    SET
    codEmpleado=?,
    descripcion=?,
    archivoUrl=?
    
    14
    
    WHERE codCv=?
    `,
    [
    codEmpleado, descripcion, archivoUrl,
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
    'DELETE FROM hojas_vida WHERE codCv = ?',
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
    obtenerCv,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
    };