const createCrudController = require('./crudFactory');

const crud = createCrudController({
    table: 'Paises',
    idColumn: 'Pais_id',
    fields: ['nombre'],
    resource: 'país'
});

module.exports = {
    obtenerPaises: crud.selectAll,
    obtenerPorId: crud.selectById,
    crear: crud.create,
    actualizar: crud.update,
    eliminar: crud.remove
};
