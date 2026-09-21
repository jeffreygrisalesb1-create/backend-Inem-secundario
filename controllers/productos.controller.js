const createCrudController = require('./crudFactory');

const crud = createCrudController({
    table: 'Productos',
    idColumn: 'Producto_id',
    fields: ['nombre', 'precio', 'CatPro_id'],
    resource: 'producto'
});

module.exports = {
    obtenerProductos: crud.selectAll,
    obtenerPorId: crud.selectById,
    crear: crud.create,
    actualizar: crud.update,
    eliminar: crud.remove
};
