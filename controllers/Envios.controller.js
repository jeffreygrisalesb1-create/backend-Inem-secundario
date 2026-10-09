const createCrudController = require('./crudFactory');

const crud = createCrudController({
    table: 'Envios',
    idColumn: 'Envio_id',
    fields: ['CiudadO_id', 'CiudadD_id', 'Transporte_id', 'FechaE', 'FechaL', 'Direccion', 'Compra_id'],
    resource: 'envío'
});

const db = require('../config/database');
const camposEnvio = ['CiudadO_id', 'CiudadD_id', 'Transporte_id', 'FechaE', 'FechaL', 'Direccion', 'Compra_id'];

async function actualizar(req, res) {
    if (!Object.prototype.hasOwnProperty.call(req.body || {}, 'Descripcion')) {
        return crud.update(req, res);
    }

    const valores = camposEnvio.map(campo => req.body?.[campo]);
    try {
        const [resultado] = await db.query(
            `UPDATE Envios SET ${camposEnvio.map(campo => `${campo} = ?`).join(', ')}, Descripcion = ? WHERE Envio_id = ?`,
            [...valores, req.body.Descripcion, req.params.id]
        );
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Registro no encontrado' });
        }
        res.json({ mensaje: 'Envío actualizado', filasAfectadas: resultado.affectedRows });
    } catch (error) {
        console.error('Error al actualizar envío:', error);
        res.status(500).json({ mensaje: 'Error al actualizar envío', detalle: error.message });
    }
}

module.exports = {
    obtenerEnvios: crud.selectAll,
    obtenerPorId: crud.selectById,
    crear: crud.create,
    actualizar,
    eliminar: crud.remove
};
