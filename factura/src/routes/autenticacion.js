const express = require('express');
const router = express.Router();
const passport = require('passport');

const usuario = require('../models/usuarios');


router.get('/registro', (req, res) => {
    res.render('auth/registro',{
        title:"Registro",
        style:"info.css"
    });
})

router.post('/registro', async (req, res, done) => {
    let errors = [];
    const { nombre_usuario, password, confirmPassword } = req.body;
    if (password != confirmPassword) {
        errors.push({ text: "Las contraseñas no coinciden" });
    }
    if (password.length < 8) {
        errors.push({ text: "La contraseña debe tener almenos 8 caracteres" });
    }
    if (errors.length > 0) {
        res.render("auth/registro", {
            errors,
            nombre_usuario,
            password,
            confirmPassword,
        });
    } else {
        const newUsuario = new usuario({nombre_usuario, password});
        newUsuario.password = await newUsuario.encryptPassword(password);
        await newUsuario.save();
        req.flash('success_msg', 'Estas registrado');
        res.redirect('login');
    }
});

router.get('/login', (req, res) => {
    res.render('auth/login',{
        title:"login",
        style:"login.css"
    });
})

router.post('/login', passport.authenticate('local',{
    successRedirect: '/menu',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
})

module.exports = router;