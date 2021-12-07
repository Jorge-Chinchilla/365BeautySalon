const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../lib/helpers');
const controllerCita = require('../controllers/controller.cita')

router.get('/cita', isAuthenticated,controllerCita.getCita);
router.get('/add_cita', isAuthenticated,controllerCita.getCreateCita);
router.get('/cliente_add_cita', controllerCita.getCreateClienteCita);
router.post('/info_cita', isAuthenticated, controllerCita.getInfoCita);
router.post('/info_cita_pen', isAuthenticated, controllerCita.getInfoCitaPen);
router.post('/edit_cita', isAuthenticated, controllerCita.getEditCita);
router.get('/pen_cita', isAuthenticated, controllerCita.getCitaPen);
router.get('/cancel_cita', isAuthenticated, controllerCita.getCitaCan);
router.get('/fin_cita', isAuthenticated, controllerCita.getCitaFin);

router.post('/cita/add_cita', isAuthenticated, controllerCita.createCita);
router.post('/cliente_add_cita', controllerCita.createClienteCita);

router.post('/cita/edit_cita/:_id', isAuthenticated, controllerCita.updateCita);
router.post('/cita/del_cita/:_id', isAuthenticated, controllerCita.deleteCita);

router.post('/filtrarCitas', isAuthenticated, controllerCita.filtrarCitas);
router.post('/filtrarCitasPen', isAuthenticated, controllerCita.filtrarCitasPen);
router.post('/filtrarCitasCan', isAuthenticated, controllerCita.filtrarCitasCan);
router.post('/filtrarCitasFin', isAuthenticated, controllerCita.filtrarCitasFin);

module.exports = router;