const Factura = require('../models/facturas')
const Servicio = require('../models/servicios')
const Cita = require('../models/citas')
const KAI = require('../models/kai')
const {NULL} = require("mysql/lib/protocol/constants/types");
const Productos = require("../models/productos");

const getFactura = async (req, res) => {
    const factura = await Factura.find().lean();
    factura.forEach(facturas => {
        if (facturas.fecha.getMinutes() < 10){
            facturas.fecha = facturas.fecha.toDateString() + " " + facturas.fecha.getHours()+":"+facturas.fecha.getMinutes()+"0";
        }else{
            facturas.fecha = facturas.fecha.toDateString() + " " + facturas.fecha.getHours()+":"+facturas.fecha.getMinutes();
        }
    });
    res.render('menu/factura/factura', {
        factura,
        title: "Facturas",
        style: "producto.css"
    });
}

const getCreateFactura = async (req, res) => {
    const cita = await Cita.find({ estado: "Pendiente"}).lean();
    const servicio = await Servicio.find().lean();
    res.render('menu/factura/add_factura', {
        cita,
        servicio,
        title: 'Nueva Factura',
        style: "info.css"
    });
}
const getCreateKAI = async (req, res) => {
    res.render('menu/factura/add_KAI', {
        title: 'Nuevo KAI',
        style: "info.css"
    });
}

const getInfoFactura = async (req, res) => {
    res.render('menu/factura/info_factura', {
        title: 'Factura',
        style: 'test.css'
    });
};

const getDeleteFactura = async (req, res) => {
    const data = req.body;
    const delFactura = await Factura.find({ kai_ID: data.kai_ID }).lean();
    res.render('menu/factura/del_factura', {
        delFactura,
        title: 'Eliminar Factura',
        style: 'test.css'
    });
}

const createFactura = async (req, res) => {
    const kai = await KAI.find().lean();
    kai.forEach(kais => {
        kai_id = kais._id
        kai_ID = kais.kai_ID;
        primero = kais.primero;
        ultimo = kais.ultimo;
        actual = kais.actual;
    });
    const data = req.body;
    const newFactura = new Factura({
        kai_ID: kai_ID,
        nFactura: actual,
        cita_ID: data.cita_ID,
        nombre: data.nombre,
        id_cliente: data.id_cliente,
        servicio: data.servicio,
    });
    await newFactura.save();
    actual= actual+1;
    await KAI.findByIdAndUpdate(kai_id, {kai_ID, primero, ultimo, actual}).lean();
    res.redirect('/factura');
}

const createKAI = async (req, res) => {
    const data = req.body;
    const newKAI = new KAI({
        kai_ID: data.kai_ID,
        primero: data.primero,
        ultimo: data.ultimo,
        actual: data.primero,
    });
    await newKAI.save();
    res.redirect('/factura');
}

const deleteFactura = async (req, res)=>{
    await Factura.findByIdAndDelete(req.params.id);
    res.redirect('/factura');
}

module.exports = {
    getFactura,
    getCreateFactura,
    getCreateKAI,
    getInfoFactura,
    getDeleteFactura,
    createFactura,
    createKAI,
    deleteFactura
}