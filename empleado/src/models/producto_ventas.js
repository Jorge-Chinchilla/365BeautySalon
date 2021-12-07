const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Producto_VentaSchema = new Schema({
    producto_ID: String,
    factura_ID: String,
    cantidad: Number
})

const Producto_Venta = mongoose.model('Producto_Venta', Producto_VentaSchema)

module.exports = Producto_Venta