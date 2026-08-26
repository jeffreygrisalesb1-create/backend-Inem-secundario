const express = require('express');

const router = express.Router();

const controlador = require('../controllers/Paises.controller');

// GET /api/grupos
router.get('/', controlador.obtenerPaises);

// crear
router.post('/', controlador.crear);

// actualizar
router.put('/:id', controlador.actualizar);

// eliminar
router.delete('/:id', controlador.eliminar);


module.exports = router;