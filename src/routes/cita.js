const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../lib/helpers');
const controllerCita = require('../controllers/controller.cita')

router.get('/cita', controllerCita.getCita);
router.get('/add_cita', controllerCita.getCreateCita);
router.post('/info_cita', controllerCita.getInfoCita);
router.post('/edit_cita', controllerCita.getEditCita);
router.post('/del_cita', controllerCita.getDeleteCita);

router.post('/cita/add_cita', controllerCita.createCita);
router.post('/cita/edit_cita/:_id', controllerCita.updateCita);
router.post('/cita/del_cita/:_id', controllerCita.deleteCita);

module.exports = router;