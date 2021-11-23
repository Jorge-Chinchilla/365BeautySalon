const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('landing/home', {
        title:'365 Beauty Salon',
        style: 'landing.css'
    });
})

module.exports = router;