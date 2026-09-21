const express = require('express');

const router = express.Router();

const controlador = require('../controllers/Ciudades.controller');

// GET /api/grupos
router.get('/', controlador.obtenerCiudades);
router.get('/:id', controlador.obtenerPorId);

// crear
router.post('/', controlador.crear);

// actualizar
router.put('/:id', controlador.actualizar);

// eliminar
router.delete('/:id', controlador.eliminar);


module.exports = router;