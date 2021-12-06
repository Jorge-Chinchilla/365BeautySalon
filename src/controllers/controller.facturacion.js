const Servicio = require('../models/servicios')
const Cita = require('../models/citas')
const Factura = require('../models/facturas')

const getFactura = async (req, res) => {
    const factura = await Factura.find().lean();
    res.render('menu/factura/factura', {
        factura,
        title: "Facturas",
        style: "test.css"
    });
}

const getCreateFactura = async (req, res) => {
    const data = req.body;
    const infoCita = await Cita.find({ _id: data.id }).lean();
    const infoServicio = await Servicio.find({ nombre: data.servicio }).lean();
    console.log(data);
    console.log(infoCita);
    console.log(infoServicio);
    res.render('menu/factura/add_factura', {
        infoCita,
        infoServicio,
        title: 'Nueva Factura',
        style: 'test.css'
    });
}

const getInfoFactura = async (req, res) => {
    const data = req.body;
    const infoFactura = await Factura.find({ kai_ID: data.kai_ID }).lean();
    res.render('menu/factura/info_factura', {
        infoFactura,
        title: 'Factura',
        style: 'test.css'
    });
};

const getDeleteFactura = async (req, res) => {
    const param = req.params.kai_ID;
    const data = req.body;
    const delFactura = await Factura.find({ kai_ID: data.kai_ID }).lean();
    res.render('menu/factura/del_factura', {
        delFactura,
        title: 'Eliminar Factura',
        style: 'test.css'
    });
}

const createFactura = async (req, res) => {
    const data = req.body;
    const newFactura = new Factura({
        kai_ID: data.kai_ID,
        cita_ID: data.cita_ID,
        clienteNombre: data.clienteNombre,
        clienteID: data.clienteID,
        fecha: data.fecha,
        precio: data.precio,
    });
    await newFactura.save();
    res.redirect('/factura');
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
    deleteFactura
}