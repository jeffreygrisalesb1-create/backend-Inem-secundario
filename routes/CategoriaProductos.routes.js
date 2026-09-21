const express = require('express');

const router = express.Router();

const controlador = require('../controllers/CategoriaProductos.controller');

router.get('/', controlador.obtenerCategoriaProductos);

router.get('/:id', controlador.obtenerPorId);

// Crear
router.post('/', controlador.crear);

// Actualizar
router.put('/:id', controlador.actualizar);

// Eliminar
router.delete('/:id', controlador.eliminar);

module.exports = router;