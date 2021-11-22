const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClienteSchema = new Schema({
    nombre: String,
    telefono: Number,
    correo: String
})

const Cliente = mongoose.model('Cliente', ClienteSchema)

module.exports = Cliente