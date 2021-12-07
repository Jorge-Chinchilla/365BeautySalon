const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CitaSchema = new Schema({
    cliente_ID: String,
    empleado_ID: String
})

const Cita = mongoose.model('Cita', CitaSchema)

module.exports = Cita