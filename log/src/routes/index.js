const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('landing/home', {
        title:'365 Beauty Salon',
        style: 'landing.css'
    });
})

router.get('/clientes_cita', (req, res)=>{
    res.render('landing/clientes_cita', {
        title:'365 Beauty Salon',
        style: 'clientes_cita.css'
    });
});

module.exports = router;