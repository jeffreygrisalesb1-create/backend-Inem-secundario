const createCrudController = require('./crudFactory');

const crud = createCrudController({
    table: 'Categorias',
    idColumn: 'Categoria_id',
    fields: ['nombre'],
    resource: 'categoría'
});

module.exports = {
    obtenerCategorias: crud.selectAll,
    obtenerPorId: crud.selectById,
    crear: crud.create,
    actualizar: crud.update,
    eliminar: crud.remove
};
