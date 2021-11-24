const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../lib/helpers');
const controllerProducto = require('../controllers/controller.producto')

router.get('/producto', controllerProducto.getProductos);
router.get('/producto/add_producto', controllerProducto.getCreateProducto);
router.get('/producto/info_producto/:id', controllerProducto.getInfoProducto);
router.get('/producto/edit_producto/:id', controllerProducto.getEditProducto);
router.get('/producto/del_producto/:id', controllerProducto.getDeleteProducto);

router.post('/producto/add_producto', controllerProducto.createProducto);
router.post('/producto/edit_producto/:id', controllerProducto.updateProducto);
router.post('/producto/del_producto/:id', controllerProducto.deleteProducto);

module.exports = router;