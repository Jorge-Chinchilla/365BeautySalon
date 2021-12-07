const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcryptjs = require ('bcryptjs');

const schemaUsuario = Schema({
    nombre_usuario: { type: String, required: true },
    password: { type: String, required: true },
});

schemaUsuario.methods.encryptPassword = async (password) =>{
    const salt = await bcryptjs.genSalt(10);
    const hash = bcryptjs.hash(password, salt);
    return hash;
};

schemaUsuario.methods.matchPassword = async function (password){
    return await bcryptjs.compare(password, this.password);
};

module.exports = mongoose.model('Usuario', schemaUsuario);