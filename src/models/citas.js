const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CitaSchema = new Schema({
    id: String,
    nombre: String,
    correo: String,
    numero: Number,
    servicio: String,
    fecha: { type: Date, default: Date.now }
})

const Cita = mongoose.model('Cita', CitaSchema)

module.exports = Cita