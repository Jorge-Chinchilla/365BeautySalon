const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Detalles_CitaSchema = new Schema({
    servicio_ID: String,
    precio: Number,
    descripcion: String,
    fecha_hora: String
})

const Detalles_Cita = mongoose.model('Detalles_Cita', Detalles_CitaSchema)

module.exports = Detalles_Cita