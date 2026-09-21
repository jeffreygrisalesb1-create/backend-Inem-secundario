const createCrudController = require('./crudFactory');

const crud = createCrudController({
    table: 'Envios',
    idColumn: 'Envio_id',
    fields: ['CiudadO_id', 'CiudadD_id', 'Transporte_id', 'FechaE', 'FechaL', 'Direccion', 'Compra_id'],
    resource: 'envío'
});

module.exports = {
    obtenerEnvios: crud.selectAll,
    obtenerPorId: crud.selectById,
    crear: crud.create,
    actualizar: crud.update,
    eliminar: crud.remove
};
