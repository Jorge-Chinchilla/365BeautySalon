const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../lib/helpers');

router.get('/', async (req, res) => {
    res.render('menu/menu');
})

module.exports = router;