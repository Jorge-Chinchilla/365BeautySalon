//Llamando a express
const express = require('express');
const app = express();

//colocamos urlencoded para capturar los datos del formulario
app.use(express.urlencoded({extends:false}));
app.use(express.json());

//Llamando dotenv
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

//Colocar el directorio public
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

//Motor de plantillas ejs
app.set('view engine', 'ejs');

//Lamar a bcryptjs
const bcrypts = require('bcryptjs');

//Variable de sesion
const session = require('express-session')
app.use(session({
    secret: 'secret',
    resav: true,
    saveUninitialized: true
}))

//Llamamos almodulo de conexion de la base de datos
const connection = require('./database/db')

//Estableciendo las rutas
app.get('/', (req, res)=>{
    res.render('index.ejs', {msg:'Mensaje de prueba desde node'});
})
app.get('/login', (req, res)=>{
    res.render('login.ejs', {msg:'Mensaje de prueba desde node'});
})
app.get('/register', (req, res)=>{
    res.render('register.ejs', {msg:'Mensaje de prueba desde node'});
})

//Registro de datos a la base de datos
app.post('/register', async (req, res)=>{
    const user = req.body.user;
    const pass = req.body.pass;
    const rol = req.body.rol;
    const idUser = req.body.idUser;
    connection.query('insert into usuarios set ?',{nombre_usuario:user, pass:pass, rol:rol, id_empleado:idUser},
        async(error, results)=>{
            if(error){
                console.log(error);
                res.render('register', {
                    alert:true,
                    alertTitle: "Error",
                    alertMessage: "Id de ususario no existe",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    timer:2500,
                    ruta:''
                })
            } else{
                res.render('register', {
                    alert:true,
                    alertTitle: "Registro",
                    alertMessage: "¡Registro Exitoso!",
                    alertIcon: 'success',
                    showConfirmButton: false,
                    timer:2500,
                    ruta:''
                })
            }
        })
})

app.listen(3000, (req, res)=>{
    console.log('Corriendo en puerto 3000');
})