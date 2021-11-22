const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Usuario = require('../models/usuarios');

passport.use(new LocalStrategy({
    usernameField: 'nombre_usuario'
}, async (nombre_usuario, password, done) => {
    const usuario = await Usuario.findOne({ nombre_usuario: nombre_usuario });
    if (!usuario) {
        return done(null, false, { message: 'Usuario no encontrado' });
    } else {
        const match = await usuario.matchPassword(password);
        if (match) {
            return done(null, usuario);
        } else {
            return done(null, false, { message: 'Contraseña Incorrecta' });
        }
    }
}));

passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
})

passport.deserializeUser(async (id, done) => {
    Usuario.findById(id, (err, usuario) => {
        done(err, usuario);
    });
})