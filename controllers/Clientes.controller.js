const createCrudController = require('./crudFactory');

const crud = createCrudController({
    table: 'Clientes',
    idColumn: 'Cliente_id',
    fields: ['nombre', 'correo', 'telefono', 'dni'],
    resource: 'cliente'
});

module.exports = {
    obtenerClientes: crud.selectAll,
    obtenerPorId: crud.selectById,
    crear: crud.create,
    actualizar: crud.update,
    eliminar: crud.remove
};
