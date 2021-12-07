const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ServicioSchema = new Schema({
    nombre: String,
    precio: Number,
    fecha: { type: Date, default: Date.now }
})

const Servicio = mongoose.model('Servicio', ServicioSchema)

module.exports = Servicio