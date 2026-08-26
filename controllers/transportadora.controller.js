const db = require('../config/database');

// Obtener todos los grupos
const obtenerTransportadoras = async (req, res) => {

    try {

        const [rows] = await db.query(
            'SELECT * FROM Transportadora'
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
    obtenerTransportadoras
};

const obtenerPorId = async (req, res) => {
    try {
    const { id } = req.params;
    const [rows] = await db.query(
    'SELECT * FROM transportadoras WHERE codTransportadora = ?',
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
    
    24
    
    // ===================================
    const crear = async (req, res) => {
    try {
    const {
    nombre,
    nit,
    telefono,
    correo
    } = req.body;
    const [resultado] = await db.query(`
    INSERT INTO transportadoras
    (
    nombre, nit, telefono, correo
    )
    VALUES (?, ?, ?, ?)
    `,
    [
    nombre, nit, telefono, correo
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
    nit,
    telefono,
    correo
    } = req.body;
    const [resultado] = await db.query(`
    UPDATE transportadoras
    SET
    nombre=?,
    nit=?,
    telefono=?,
    correo=?
    WHERE codTransportadora=?
    `,
    [
    nombre, nit, telefono, correo,
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
    
    25
    
    // ===================================
    // Eliminar
    // ===================================
    const eliminar = async (req, res) => {
    try {
    const { id } = req.params;
    const [resultado] = await db.query(
    'DELETE FROM transportadoras WHERE codTransportadora = ?',
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
    obtenerTransportadoras,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
    };