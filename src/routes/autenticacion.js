const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/registro', (req, res)=>{
    res.render('auth/registro');
})

router.post('/registro', passport.authenticate('local.registro', {
        successRedirect: '/login',
        failureRedirect: '/registro',
        failureFlash: true
}));

router.get('/login', (req, res)=>{
    res.render('auth/login');
})

router.post('/login', (req, res, next)=>{
    passport.authenticate('local.login', {
        successRedirect:'/menu',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
})

router.get('/logout', (req, res)=>{
    req.logOut();
    res.redirect('/login');
})

router.get('/profile', (req, res) =>{
    res.send('Este es Profile')
})

module.exports = router;