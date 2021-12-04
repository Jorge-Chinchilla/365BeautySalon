const Servicio = require('../models/servicios')

const getServicio = async (req, res) => {
    const servicio = await Servicio.find().lean();
    res.render('menu/servicio/servicio', {
        servicio,
        title:"login",
        style:"producto.css"
    });
}

const getCreateServicio = (req, res) => {
    res.render('menu/servicio/add_servicio', {
        title:'Agregar Servicio',
        style:'add_servicio.css'
    });
}

const getInfoServicio = async (req, res) => {
    const data = req.body;
    console.log(data.id);
    const infoServicio = await Servicio.find({ id: data.id }).lean();
    res.render('menu/servicio/info_servicio', {
        infoServicio,
        title:'Agregar Servicio',
        style:'add_servicio.css'
    });
};

const getEditServicio = async (req, res) => {
    const param = req.params.id;
    const editServicio = await Servicio.find({ id: param }).lean();
    res.render('menu/servicio/edit_servicio', { editServicio });
};

const getDeleteServicio = async (req, res) => {
    const param = req.params.id;
    const delServicio = await Servicio.find({ id: param }).lean();
    res.render('menu/servicio/del_servicio', { delServicio });
}

const createServicio = async (req, res) => {
    const data = req.body;
    const newServicio = new Servicio({
        id: data.id,
        nombre: data.nombre,
        precio: data.precio,
    });
    await newServicio.save();
    res.redirect('/servicio');
}

const updateServicio = async (req, res) => {
    const { id, nombre, cantidad, precio_compra, precio_venta, categoria } = req.body;
    await Servicio.findByIdAndUpdate(req.params.id, { id, nombre, cantidad, precio_compra, precio_venta, categoria }).lean();
    res.redirect('/servicio')
}

const deleteServicio = async (req, res)=>{
    await Servicio.findByIdAndDelete(req.params.id);
    // req.flash("success_msg", "Producto Eliminado");
    res.redirect('/servicio');
}

module.exports = {
    getServicio,
    getCreateServicio,
    getInfoServicio,
    getEditServicio,
    getDeleteServicio,
    createServicio,
    updateServicio,
    deleteServicio,
}