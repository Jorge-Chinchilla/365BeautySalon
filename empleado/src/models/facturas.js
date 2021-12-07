const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FacturaSchema = new Schema({
    kai_ID: String,
    cita_ID: String,
    cliente_ID: String,
    fecha: String,
    precio: Number
})

const Factura = mongoose.model('Factura', FacturaSchema)

module.exports = Factura