const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategoriaSchema = new Schema({
    nombre: String
})

const Categoria = mongoose.model('Categoria', CategoriaSchema)

module.exports = Categoria