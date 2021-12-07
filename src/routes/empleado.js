const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../lib/helpers');
const controllerEmpleado = require('../controllers/controller.empleado')
const controllerProducto = require("../controllers/controller.producto");

router.get('/empleado',controllerEmpleado.getEmpleado);
router.get('/add_empleado', controllerEmpleado.getCreateEmpleado);
router.post('/info_empleado', controllerEmpleado.getInfoEmpleado);
router.post('/edit_empleado', controllerEmpleado.getEditEmpleado);
router.post('/del_empleado', controllerEmpleado.getDeleteEmpleado);

router.post('/empleado/add_empleado', controllerEmpleado.createEmpleado);
router.post('/empleado/edit_empleado/:id', controllerEmpleado.updateEmpleado);
router.post('/empleado/del_empleado/:id', controllerEmpleado.deleteEmpleado);

router.post('/filtrarEmpleado', controllerEmpleado.filtrarEmpleado);

module.exports = router;