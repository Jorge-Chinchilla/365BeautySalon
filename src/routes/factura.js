const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../lib/helpers');
const controllerFactura = require('../controllers/controller.facturacion')

router.get('/factura', controllerFactura.getFactura);
router.get('/add_factura', controllerFactura.getCreateFactura);
router.post('/info_factura', controllerFactura.getInfoFactura);
router.post('/del_factura', controllerFactura.getDeleteFactura);

router.post('/producto/add_factura', controllerFactura.createFactura);
router.post('/producto/del_factura/:id', controllerFactura.deleteFactura);

module.exports = router;