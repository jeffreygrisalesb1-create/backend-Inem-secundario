const db = require('../config/database');

// Obtener todos los grupos
const obtenerCategoriaProductos = async (req, res) => {

    try {

        const [rows] = await db.query(
            'SELECT * FROM CategoriaProductos'
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
    obtenerCategoriaProductos
};

const obtenerporId = async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await db.query(
            "select * from categoriaproductos where Catpro_id = ?",
            [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({
                mensaje: "registro no encontrado"
            });

        }
        res.json(rows[0]);
   } catch (error)    {
        console.error(error);
        res.status(500).json({
            mensaje: "error del servidor"
        });
   }
};

const crear = async (req, res) => {
    try {
    const {
    nombre,
    descripcion
    } = req.body;
    const [resultado] = await db.query(`
    INSERT INTO categoriaproductos
    (
    nombre, descripcion
    )
    VALUES (?, ?)
    
    1
    
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
    UPDATE categoriaproductos
    SET
    nombre=?,
    descripcion=?
    WHERE Catpro_id=?
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
    'DELETE FROM categoriaproductos WHERE Catpro_id = ?',
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
    
    2
    
    };
    module.exports = {
    obtenerCategoriaProductos,
    obtenerporId,
    crear,
    actualizar,
    eliminar

    };
        
