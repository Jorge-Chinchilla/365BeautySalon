const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmpleadoSchema = new Schema({
    nombre: String,
    telefono: Number,
    correo: String
})

const Empleado = mongoose.model('Empleado', EmpleadoSchema)

module.exports = Empleado