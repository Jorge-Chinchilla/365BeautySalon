const mongoose = require('mongoose')
const { mongodb } = require('./keys')

const database = mongoose.connect(`mongodb://${mongodb.host}:${mongodb.port}/${mongodb.database}`)
.then((db)=>{
    console.log('Conectado a la BD')
}).catch((err)=>{
    console.log('Ha ocurrido un error: ' + err)
})

module.exports = database;