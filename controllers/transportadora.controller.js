const createCrudController = require('./crudFactory');

const crud = createCrudController({
    table: 'Transportadora',
    idColumn: 'Transporte_id',
    fields: ['nombre'],
    resource: 'transportadora'
});

module.exports = {
    obtenerTransportadoras: crud.selectAll,
    obtenerPorId: crud.selectById,
    crear: crud.create,
    actualizar: crud.update,
    eliminar: crud.remove
};
