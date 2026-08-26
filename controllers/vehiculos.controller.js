const db = require('../config/database');

// Obtener todos los grupos
const obtenerVehiculos = async (req, res) => {

    try {

        const [rows] = await db.query(
            'SELECT * FROM Vehiculos'
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
    obtenerVehiculos
};

const obtenerPorId = async (req, res) => {
    try {
    const { id } = req.params;
    const [rows] = await db.query(
    'SELECT * FROM vehiculos WHERE codVehiculo = ?',
    [id]
    );
    if (rows.length === 0) {
    return res.status(404).json({
    mensaje: 'Registro no encontrado'
    });
    }
    res.json(rows[0]);
    } catch (error) {
    
    26
    
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
    placa,
    marca,
    modelo,
    codTransportadora
    } = req.body;
    const [resultado] = await db.query(`
    INSERT INTO vehiculos
    (
    placa, marca, modelo, codTransportadora
    )
    VALUES (?, ?, ?, ?)
    `,
    [
    placa, marca, modelo, codTransportadora
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
    placa,
    marca,
    modelo,
    codTransportadora
    } = req.body;
    const [resultado] = await db.query(`
    UPDATE vehiculos
    SET
    placa=?,
    marca=?,
    modelo=?,
    codTransportadora=?
    WHERE codVehiculo=?
    `,
    [
    placa, marca, modelo, codTransportadora,
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
    'DELETE FROM vehiculos WHERE codVehiculo = ?',
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
    obtenerVehiculos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
    };