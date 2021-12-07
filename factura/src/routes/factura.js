const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../lib/helpers');
const controllerFactura = require('../controllers/controller.facturacion');

router.get('/factura', controllerFactura.getFactura);
router.get('/add_factura', controllerFactura.getCreateFactura);
router.post('/info_factura', controllerFactura.getInfoFactura);
router.post('/edit_kai', controllerFactura.getEditKAI);

router.post('/factura/add_factura', controllerFactura.createFactura);
router.post('/factura/edit_kai/:id', controllerFactura.updateKAI);

router.post('/filtrarFactura', controllerFactura.filtrarFactura);

module.exports = router;