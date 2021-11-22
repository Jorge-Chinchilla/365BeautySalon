const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductoSchema = new Schema({
    _id: { type: String, required: true },
    nombre: { type: String, required: true },
    cantidad: { type: Number, required: true },
    precio_compra: { type: Number, required: true },
    precio_venta: { type: Number, required: true },
    fecha: { type: Date, default: Date.now },
    categoria: { type: String, required: true }
});

module.exports = mongoose.model('productos', ProductoSchema);
