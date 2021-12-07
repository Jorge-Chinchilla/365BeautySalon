const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CitaSchema = new Schema({
    nombre: String,
    correo: String,
    numero: String,
    servicio: String,
    fecha_cita: Date,
    estado: String,
    fecha: { type: Date, default: Date.now }
})

const Cita = mongoose.model('Cita', CitaSchema)

module.exports = Cita