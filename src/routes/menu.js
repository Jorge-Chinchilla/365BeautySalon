const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../lib/helpers');

router.get('/',async (req, res) => {
    res.render('menu/menu', {
        title: 'Inicio',
        style: 'menu.css'
    });
})

module.exports = router;