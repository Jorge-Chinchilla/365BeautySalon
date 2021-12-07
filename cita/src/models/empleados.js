const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmpleadoSchema = new Schema({
    id: String,
    nombre: String,
    apellido: String,
    telefono: String,
    correo: String,
    cargo: String,
    fecha: { type: Date, default: Date.now }
})

module.exports = mongoose.model('empleados', EmpleadoSchema)