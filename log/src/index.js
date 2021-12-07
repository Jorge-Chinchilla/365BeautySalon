const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const path = require('path');
const flash = require('connect-flash');
const passport = require('passport');
const database = require('./database')

//Inicializando
const app = express();
require('./lib/passport');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname:'.hbs',
    helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');

//Middlewares
app.use(session({
    secret: 'secret',
    resav: true,
    saveUninitialized: true
}));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//Variable globales
app.use((req, res, next)=>{
    app.locals.success_msg = req.flash('success_msg');
    app.locals.error_msg = req.flash('error_msg');
    app.locals.error = req.flash('error');
    app.locals.user = req.user;
    next();
})

//Rutas
app.use(require('./routes'));
app.use(require('./routes/autenticacion'));
app.use('/', require('./routes/producto'));
app.use('/', require('./routes/empleado'));
app.use('/', require('./routes/servicio'));
app.use('/', require('./routes/cita'));
app.use('/', require('./routes/factura'));
app.use('/menu', require('./routes/menu'));

//Public
app.use(express.static(path.join(__dirname, 'public')));

//Inicializar el servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto', app.get('port'));
})