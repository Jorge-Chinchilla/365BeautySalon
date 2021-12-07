const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../lib/helpers');
const controllerProducto = require('../controllers/controller.producto')

router.get('/producto', controllerProducto.getProductos);
router.get('/add_producto', controllerProducto.getCreateProducto);
router.post('/info_producto', controllerProducto.getInfoProducto);
router.post('/edit_producto', controllerProducto.getEditProducto);
router.post('/del_producto', controllerProducto.getDeleteProducto);

router.post('/producto/add_producto', controllerProducto.createProducto);
router.post('/producto/edit_producto/:id', controllerProducto.updateProducto);
router.post('/producto/del_producto/:id', controllerProducto.deleteProducto);

router.post('/filtrarProducto', controllerProducto.filtrarProducto);

module.exports = router;