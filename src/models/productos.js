const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductoSchema = new Schema({
    nombre: String,
    cantidad: Number,
    precio_compra: Number,
    precio_venta: Number,
    fecha: { type: Date, default: Date.now },
    categoria: String
});

module.exports = mongoose.model('productos', ProductoSchema);
