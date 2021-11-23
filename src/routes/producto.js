const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../lib/helpers');
const controllerProducto = require('../controllers/controller.producto')

router.get('/producto', controllerProducto.getProductos);
router.get('/producto/add_producto', controllerProducto.getCreateProducto);
router.get('/producto/info_producto/:id', controllerProducto.getInfoProducto);

router.post('/producto/add_producto', controllerProducto.createProducto);

module.exports = router;