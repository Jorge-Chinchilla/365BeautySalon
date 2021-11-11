const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

//Inicializando
const app = express();

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
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//Variable globales
app.use((req, res, next)=>{
    next();
})

//Rutas
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/menu', require('./routes/menu'));

//Public
app.use(express.static(path.join(__dirname, 'public')));

//Inicializar el servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto', app.get('port'));
})