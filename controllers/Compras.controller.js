const createCrudController = require('./crudFactory');

const crud = createCrudController({
    table: 'Compras',
    idColumn: 'Compra_id',
    fields: ['fecha', 'Cliente_id', 'Empleado_id'],
    resource: 'compra'
});

module.exports = {
    obtenerCompras: crud.selectAll,
    obtenerPorId: crud.selectById,
    crear: crud.create,
    actualizar: crud.update,
    eliminar: crud.remove
};
