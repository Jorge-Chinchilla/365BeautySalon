const mongoose = require('mongoose')
const { mongodb } = require('./keys')

const database = mongoose.connect(`mongodb+srv://admin:asd123@cluster0.pejgq.mongodb.net/beauty_salon_365?retryWrites=true&w=majority`)
.then((db)=>{
    console.log('Conectado a la BD')
}).catch((err)=>{
    console.log('Ha ocurrido un error: ' + err)
})

module.exports = database;