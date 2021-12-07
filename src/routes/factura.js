const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../lib/helpers');
const controllerFactura = require('../controllers/controller.facturacion')

router.get('/factura', controllerFactura.getFactura);
router.get('/add_factura', controllerFactura.getCreateFactura);
router.post('/add_KAI', controllerFactura.getCreateKAI);
router.post('/info_factura', controllerFactura.getInfoFactura);
router.post('/del_factura', controllerFactura.getDeleteFactura);

router.post('/factura/add_factura', controllerFactura.createFactura);
router.post('/factura/add_KAI', controllerFactura.createKAI);
router.post('/factura/del_factura', controllerFactura.deleteFactura);

module.exports = router;