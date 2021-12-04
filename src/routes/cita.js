const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../lib/helpers');
const controllerCita = require('../controllers/controller.cita')

router.get('/cita', controllerCita.getCita);
router.get('/add_cita', controllerCita.getCreateCita);
router.get('/info_cita/:id', controllerCita.getInfoCita);
router.get('/cita/edit_cita/:id', controllerCita.getEditCita);
router.get('/cita/del_cita/:id', controllerCita.getDeleteCita);

router.post('/cita/add_cita', controllerCita.createCita);
router.post('/cita/edit_cita/:id', controllerCita.updateCita);
router.post('/cita/del_cita/:id', controllerCita.deleteCita);

module.exports = router;