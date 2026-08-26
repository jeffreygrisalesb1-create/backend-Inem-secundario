const db = require('../config/database');

// Obtener todos los grupos
const obtenerCompras = async (req, res) => {

    try {

        const [rows] = await db.query(
            'SELECT * FROM Compras'
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
    obtenerCompras
};

const obtenerPorId = async (req, res) => {
    try {
    const { id } = req.params;
    const [rows] = await db.query(
    'SELECT * FROM compras WHERE codCompra = ?',
    [id]
    );
    if (rows.length === 0) {
    return res.status(404).json({
    mensaje: 'Registro no encontrado'
    });
    }
    res.json(rows[0]);
    
    9
    
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
    fecha,
    codCliente,
    total,
    estado
    } = req.body;
    const [resultado] = await db.query(`
    INSERT INTO compras
    (
    fecha, codCliente, total, estado
    )
    VALUES (?, ?, ?, ?)
    `,
    [
    fecha, codCliente, total, estado
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
    fecha,
    codCliente,
    total,
    estado
    } = req.body;
    const [resultado] = await db.query(`
    UPDATE compras
    SET
    fecha=?,
    codCliente=?,
    total=?,
    estado=?
    WHERE codCompra=?
    `,
    [
    fecha, codCliente, total, estado,
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
    'DELETE FROM compras WHERE codCompra = ?',
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
    obtenerCompras,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
    };