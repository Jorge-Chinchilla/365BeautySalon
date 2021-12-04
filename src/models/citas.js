const mongoose = require('mongoose')
const {DATETIME, TIME} = require("mysql/lib/protocol/constants/types");
const Schema = mongoose.Schema

const CitaSchema = new Schema({
    id: String,
    nombre: String,
    correo: String,
    numero: Number,
    servicio: String,
    fecha_cita: Date,
    fecha: { type: Date, default: Date.now }
})

const Cita = mongoose.model('Cita', CitaSchema)

module.exports = Cita