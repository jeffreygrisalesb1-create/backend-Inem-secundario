const createCrudController = require('./crudFactory');

const crud = createCrudController({
    table: 'Ciudades',
    idColumn: 'Ciudad_id',
    fields: ['nombre', 'Pais_id'],
    resource: 'ciudad'
});

module.exports = {
    obtenerCiudades: crud.selectAll,
    obtenerPorId: crud.selectById,
    crear: crud.create,
    actualizar: crud.update,
    eliminar: crud.remove
};
