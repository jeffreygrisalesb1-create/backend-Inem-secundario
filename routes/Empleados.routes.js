const express = require('express');

const router = express.Router();

const controlador = require('../controllers/Empleados.controller');

// GET /api/grupos
router.get('/', controlador.obtenerEmpleados);
router.get('/:id', controlador.obtenerPorId);

// crear
router.post('/', controlador.crear);

// actualizar
router.put('/:id', controlador.actualizar);

// eliminar
router.delete('/:id', controlador.eliminar);


module.exports = router;