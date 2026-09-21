const createCrudController = require('./crudFactory');

const crud = createCrudController({
    table: 'Empleados',
    idColumn: 'Empleado_id',
    fields: ['nombre', 'correo', 'telefono', 'dni'],
    resource: 'empleado'
});

module.exports = {
    obtenerEmpleados: crud.selectAll,
    obtenerPorId: crud.selectById,
    crear: crud.create,
    actualizar: crud.update,
    eliminar: crud.remove
};
