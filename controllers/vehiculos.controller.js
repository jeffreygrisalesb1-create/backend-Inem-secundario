const createCrudController = require('./crudFactory');

const crud = createCrudController({
    table: 'Vehiculos',
    idColumn: 'Vehiculo_id',
    fields: ['nombre', 'Marca', 'Modelo', 'Placa', 'Color', 'Cantidad', 'Categoria_id', 'precio'],
    resource: 'vehículo'
});

module.exports = {
    obtenerVehiculos: crud.selectAll,
    obtenerPorId: crud.selectById,
    crear: crud.create,
    actualizar: crud.update,
    eliminar: crud.remove
};
