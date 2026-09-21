const createCrudController = require('./crudFactory');

const crud = createCrudController({
    table: 'CP',
    idColumn: 'Cp_id',
    fields: ['Compra_id', 'Producto_id'],
    resource: 'detalle de compra'
});

module.exports = {
    obtenerCP: crud.selectAll,
    obtenerPorId: crud.selectById,
    crear: crud.create,
    actualizar: crud.update,
    eliminar: crud.remove
};
