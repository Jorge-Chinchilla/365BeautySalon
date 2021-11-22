const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ServicioSchema = new Schema({
    nombre: String,
    producto_ID: String
})

const Servicio = mongoose.model('Servicio', ServicioSchema)

module.exports = Servicio