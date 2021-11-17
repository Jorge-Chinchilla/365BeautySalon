const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/authRoutes');

router.get('/', isLoggedIn, async (req, res)=>{
    res.render('menu/menu');
})


module.exports = router;