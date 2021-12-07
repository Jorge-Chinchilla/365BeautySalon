const mongoose = require('mongoose')
const Schema = mongoose.Schema

const KAISchema = new Schema({
    kai_ID: String,
})

const KAI = mongoose.model('KAI', KAISchema)

module.exports = KAI