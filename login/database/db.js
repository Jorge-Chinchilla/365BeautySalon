const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "beauty_salon_365"  //Cambiar a la base de datos BeautySalon365
});

connection.connect((error)=>{
    if(error){
        console.log('Error de conexion: ' +error);
        return;
    }
    console.log('Conectado a la base de datos');
});

module.exports = connection;