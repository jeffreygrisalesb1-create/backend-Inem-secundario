const db = require('../config/database');

// Obtener todos los grupos
const obtenerClientes = async (req, res) => {

    try {

        const [rows] = await db.query(
            'SELECT * FROM Clientes'
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
    obtenerClientes
};

const obtenerPorId = async (req, res) => {
    try {
    const { id } = req.params;
    const [rows] = await db.query(
    'SELECT * FROM clientes WHERE codCliente = ?',
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
    apellido,
    telefono,
    correo,
    nroDocumento,
    codTipoDocumento
    } = req.body;
    const [resultado] = await db.query(`
    INSERT INTO clientes
    (
    nombre, apellido, telefono, correo, nroDocumento, codTipoDocumento
    )
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
    nombre, apellido, telefono, correo, nroDocumento, codTipoDocumento
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
    apellido,
    telefono,
    correo,
    nroDocumento,
    codTipoDocumento
    } = req.body;
    const [resultado] = await db.query(`
    UPDATE clientes
    SET
    nombre=?,
    apellido=?,
    telefono=?,
    correo=?,
    nroDocumento=?,
    codTipoDocumento=?
    WHERE codCliente=?
    `,
    [
    nombre, apellido, telefono, correo, nroDocumento, codTipoDocumento,
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
    
    8
    
    // ===================================
    // Eliminar
    // ===================================
    const eliminar = async (req, res) => {
    try {
    const { id } = req.params;
    const [resultado] = await db.query(
    'DELETE FROM clientes WHERE codCliente = ?',
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
    obtenerClientes,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
    };