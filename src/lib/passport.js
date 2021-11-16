const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.login', new LocalStrategy({
    usernameField: 'nombre_usuario',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, nombre_usuario, password, done) => {
    console.log(req.body);
    const rows = await pool.query('select * from usuarios where nombre_usuario = ?', [nombre_usuario]);
    if (rows.length > 0) {
        const usuario = rows[0];
        const validarPassword = await helpers.matchPassword(password, usuario.password);
        if (validarPassword) {
            done(null, usuario, req.flash('success'));
        } else {
            done(null, false, req.flash('message', 'Contraseña Invalida'));
        }
    } else {
        return done(null, false, req.flash('message', 'Nombre de usuario no existe'));
    }
}));

passport.use('local.registro', new LocalStrategy({
    usernameField: 'nombre_usuario',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, nombre_usuario, password, done) => {
    const { nombre_completo } = req.body;
    const newUsuario = {
        nombre_usuario,
        password,
        nombre_completo
    }
    newUsuario.password = await helpers.encryptPassword(password);
    const result = await pool.query('insert into usuarios set?', [newUsuario]);
    newUsuario.id = result.insertId;
    return done(null, newUsuario);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('select * from usuarios where id = ?', [id]);
    done(null, rows[0]);
})