const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../lib/helpers');
const controllerEmpleado = require('../controllers/controller.empleado')

router.get('/empleado', controllerEmpleado.getEmpleado);
router.get('/empleado/add_empleado', controllerEmpleado.getCreateEmpleado);
router.get('/empleado/info_empleado/:id', controllerEmpleado.getInfoEmpleado);
router.get('/empleado/edit_empleado/:id', controllerEmpleado.getEditEmpleado);
router.get('/empleado/del_empleado/:id', controllerEmpleado.getDeleteEmpleado);

router.post('/empleado/add_empleado', controllerEmpleado.createEmpleado);
router.post('/empleado/edit_empleado/:id', controllerEmpleado.updateEmpleado);
router.post('/empleado/del_empleado/:id', controllerEmpleado.deleteEmpleado);

module.exports = router;