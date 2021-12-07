const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FacturaSchema = new Schema({
    kai_ID: String,
    cita_ID: String,
    nFactura: Number,
    nombre: String,
    id_cliente: String,
    servicio: String,
    total: Number,
    fecha: { type: Date, default: Date.now }
})

const Factura = mongoose.model('Factura', FacturaSchema)

module.exports = Factura