const db = require('../config/database');

// Obtener todos los grupos
const obtenerEnvios = async (req, res) => {

    try {

        const [rows] = await db.query(
            'SELECT * FROM Envios'
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
    obtenerEnvios
};

const obtenerPorId = async (req, res) => {
    try {
    const { id } = req.params;
    const [rows] = await db.query(
    'SELECT * FROM envios WHERE codEnvio = ?',
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
    fechaEnvio,
    codCompra,
    codTransportadora,
    codVehiculo,
    estado
    } = req.body;
    const [resultado] = await db.query(`
    INSERT INTO envios
    (
    fechaEnvio, codCompra, codTransportadora, codVehiculo, estado
    )
    VALUES (?, ?, ?, ?, ?)
    `,
    [
    fechaEnvio, codCompra, codTransportadora, codVehiculo, estado
    ]);
    res.status(201).json({
    mensaje: 'Registro creado',
    id: resultado.insertId
    });
    } catch (error) {
    
    18
    
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
    fechaEnvio,
    codCompra,
    codTransportadora,
    codVehiculo,
    estado
    } = req.body;
    const [resultado] = await db.query(`
    UPDATE envios
    SET
    fechaEnvio=?,
    codCompra=?,
    codTransportadora=?,
    codVehiculo=?,
    estado=?
    WHERE codEnvio=?
    `,
    [
    fechaEnvio, codCompra, codTransportadora, codVehiculo, estado,
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
    'DELETE FROM envios WHERE codEnvio = ?',
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
    obtenerEnvios,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
    };