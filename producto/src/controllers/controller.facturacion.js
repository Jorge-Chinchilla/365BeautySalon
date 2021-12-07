const Factura = require('../models/facturas')
const Servicio = require('../models/servicios')
const Cita = require('../models/citas')
const KAI = require('../models/kai')
const {NULL} = require("mysql/lib/protocol/constants/types");
const Productos = require("../models/productos");

const getFactura = async (req, res) => {
    const factura = await Factura.find().lean();
    const kai = await KAI.find().lean();
    factura.forEach(facturas => {
        if (facturas.fecha.getMinutes() < 10){
            facturas.fecha = facturas.fecha.toDateString() + " " + facturas.fecha.getHours()+":"+facturas.fecha.getMinutes()+"0";
        }else{
            facturas.fecha = facturas.fecha.toDateString() + " " + facturas.fecha.getHours()+":"+facturas.fecha.getMinutes();
        }
    });
    res.render('menu/factura/factura', {
        factura,
        kai,
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

const getEditKAI = async (req, res) => {
    const data = req.body;
    console.log(data.id);
    const editKAI = await KAI.find({ _id: data.id }).lean();
    res.render('menu/factura/edit_kai', {
        editKAI,
        title:'Editar Producto',
        style:'info.css'
    });
};

const getInfoFactura = async (req, res) => {
    const infoFactura = await Factura.find().lean();
    infoFactura.forEach(facturas => {
        if (facturas.fecha.getMinutes() < 10){
            facturas.fecha = facturas.fecha.toDateString() + " " + facturas.fecha.getHours()+":"+facturas.fecha.getMinutes()+"0";
        }else{
            facturas.fecha = facturas.fecha.toDateString() + " " + facturas.fecha.getHours()+":"+facturas.fecha.getMinutes();
        }
    });
    res.render('menu/factura/info_factura', {
        infoFactura,
        title: 'Factura',
        style: 'info.css'
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

    if(ultimo<actual){
        res.redirect('/factura');
    }else{
        const data = req.body;
        const getServicio = await Servicio.findById({ _id: data.servicio }).lean();

        const cita = await Cita.findById({ _id: data.cita_ID}).lean();
        console.log(cita,"Cita Creada");
        if(cita != null){
            nombre = cita.nombre;
            correo = cita.correo;
            numero = cita.numero;
            servicio = cita.servicio;
            fecha_cita = cita.fecha_cita;
            estado = "Finalizado";
            await Cita.findByIdAndUpdate(data.cita_ID, { nombre, correo, numero, servicio, fecha_cita, estado }).lean();
        }

        const newFactura = new Factura({
            kai_ID: kai_ID,
            cita_ID: data.cita_ID,
            nFactura: actual,
            nombre: data.nombre,
            id_cliente: data.id_cliente,
            servicio: getServicio.nombre,
            total: getServicio.precio
        });
        await newFactura.save();
        actual= actual+1;
        await KAI.findByIdAndUpdate(kai_id, {kai_ID, primero, ultimo, actual}).lean();
        res.redirect('/factura');
    }
}


const updateKAI = async (req, res) => {
    const { kai_ID, primero, ultimo, actual} = req.body;
    await KAI.findByIdAndUpdate(req.params.id, { kai_ID, primero, ultimo, actual}).lean();
    res.redirect('/factura')
}


const deleteFactura = async (req, res)=>{
    await Factura.findByIdAndDelete(req.params.id);
    res.redirect('/factura');
}

module.exports = {
    getFactura,
    getCreateFactura,
    getInfoFactura,
    getDeleteFactura,
    createFactura,
    updateKAI,
    getEditKAI,
    deleteFactura
}