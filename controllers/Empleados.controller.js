const db = require('../config/database');

// Obtener todos los grupos
const obtenerEmpleados = async (req, res) => {

    try {

        const [rows] = await db.query(
            'SELECT * FROM Empleados'
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
    obtenerEmpleados
};

const obtenerPorId = async (req, res) => {
    try {
    const { id } = req.params;
    const [rows] = await db.query(
    'SELECT * FROM empleados WHERE codEmpleado = ?',
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
    cargo,
    salario
    } = req.body;
    const [resultado] = await db.query(`
    INSERT INTO empleados
    (
    nombre, apellido, telefono, correo, cargo, salario
    )
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
    nombre, apellido, telefono, correo, cargo, salario
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
    cargo,
    salario
    } = req.body;
    const [resultado] = await db.query(`
    UPDATE empleados
    SET
    nombre=?,
    apellido=?,
    telefono=?,
    correo=?,
    cargo=?,
    salario=?
    WHERE codEmpleado=?
    `,
    [
    nombre, apellido, telefono, correo, cargo, salario,
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
    'DELETE FROM empleados WHERE codEmpleado = ?',
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
    obtenerEmpleados,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
    };