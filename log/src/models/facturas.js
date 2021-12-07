const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FacturaSchema = new Schema({
    kai_ID: String,
    cita_ID: String,
    clienteNombre: String,
    servicio: String,
    fecha: { type: Date, default: Date.now },
    total: Number
})

const Factura = mongoose.model('Factura', FacturaSchema)

module.exports = Factura