const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ServicioSchema = new Schema({
    nombre: String,
    precio: Number
})

const Servicio = mongoose.model('Servicio', ServicioSchema)

module.exports = Servicio