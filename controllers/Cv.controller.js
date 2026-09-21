const createCrudController = require('./crudFactory');

const crud = createCrudController({
    table: 'Cv',
    idColumn: 'Cv_id',
    fields: ['Compra_id', 'Vehiculo_id'],
    resource: 'relación compra vehículo'
});

module.exports = {
    obtenerCv: crud.selectAll,
    obtenerPorId: crud.selectById,
    crear: crud.create,
    actualizar: crud.update,
    eliminar: crud.remove
};
