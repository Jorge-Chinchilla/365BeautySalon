const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../lib/helpers');
const controllerServicio = require('../controllers/controller.servicio')

router.get('/servicio', controllerServicio.getServicio);
router.get('/add_servicio', controllerServicio.getCreateServicio);
router.post('/info_servicio', controllerServicio.getInfoServicio);
router.get('/servicio/edit_servicio/:id', controllerServicio.getEditServicio);
router.get('/servicio/del_servicio/:id', controllerServicio.getDeleteServicio);

router.post('/servicio/add_servicio', controllerServicio.createServicio);
router.post('/servicio/edit_servicio/:id', controllerServicio.updateServicio);
router.post('/servicio/del_servicio/:id', controllerServicio.deleteServicio);


module.exports = router;