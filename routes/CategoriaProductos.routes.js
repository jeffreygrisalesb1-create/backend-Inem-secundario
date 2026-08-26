const express = require('express');

const router = express.Router();

const controlador = require('../controllers/CategoriaProductos.controller');

//obtener todos no dio

router.get('/:id', controlador.actualizar)

// Crear
router.post('/', controlador.crear);

// Actualizar
router.put('/:id', controlador.actualizar);

// Eliminar
router.delete('/:id', controlador.eliminar);

// GET /api/grupos
router.get('/', controlador.obtenerCategoriaProductos);
module.exports = router;