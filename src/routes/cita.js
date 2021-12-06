const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../lib/helpers');
const controllerCita = require('../controllers/controller.cita')

router.get('/cita', controllerCita.getCita);
router.get('/add_cita', controllerCita.getCreateCita);
router.post('/info_cita', controllerCita.getInfoCita);
router.post('/info_cita_pen', controllerCita.getInfoCitaPen);
router.post('/edit_cita', controllerCita.getEditCita);
router.get('/pen_cita', controllerCita.getCitaPen);
router.get('/cancel_cita', controllerCita.getCitaCan);
router.get('/fin_cita', controllerCita.getCitaFin);

router.post('/cita/add_cita', controllerCita.createCita);
router.post('/cita/edit_cita/:_id', controllerCita.updateCita);
router.post('/cita/del_cita/:_id', controllerCita.deleteCita);

router.post('/filtrarCitas', controllerCita.filtrarCitas);

module.exports = router;