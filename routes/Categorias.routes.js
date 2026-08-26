const express = require('express');

const router = express.Router();

const controlador = require('../controllers/Categorias.controller');

// GET /api/grupos
router.get('/', controlador.obtenerCategorias);

// Crear
router.post('/', controlador.crear);

// Actualizar
router.put('/:id', controlador.actualizar);

// Eliminar
router.delete('/:id', controlador.eliminar);

module.exports = router;