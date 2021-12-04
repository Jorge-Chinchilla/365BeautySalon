const Servicio = require('../models/servicios')

const getServicio = async (req, res) => {
    const servicio = await Servicio.find().lean();
    res.render('menu/servicio/servicio', {
        servicio,
        title:"Servicios",
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
    const infoServicio = await Servicio.find({ id: data.id }).lean();
    res.render('menu/servicio/info_servicio', {
        infoServicio,
        title:'Agregar Servicio',
        style:'add_servicio.css'
    });
};

const getEditServicio = async (req, res) => {
    const data = req.body;
    console.log(data.id)
    const editServicio = await Servicio.find({ id: data.id }).lean();
    res.render('menu/servicio/edit_servicio', {
        editServicio,
        title:'editar Servicio',
        style:'add_servicio.css'
    });
};

const getDeleteServicio = async (req, res) => {
    const data = req.body;
    const delServicio = await Servicio.find({ id: data.id }).lean();
    res.render('menu/servicio/del_servicio', {
        delServicio,
        title:'Eliminar servicio',
        style:'add_servicio.css'
    });
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

const filtrarServicio = async (req, res) => {
    const data = req.body.nombre
    productos = await Servicio.find({ "nombre": { $regex: new RegExp(data)}}).lean();
    console.log(productos.length)
    if(productos.length<1){
        const dataUpperFirst = data.charAt(0).toUpperCase() + data.slice(1);
        console.log(dataUpperFirst)
        productos = await Servicio.find({ "nombre": { $regex: new RegExp(dataUpperFirst)}}).lean();
        if(productos.length<1){
            const dataLowerFirst = data.charAt(0).toLowerCase() + data.slice(1);
            productos = await Servicio.find({ "nombre": { $regex: new RegExp(dataLowerFirst)}}).lean();
            if(productos.length<1){
                const dataUpper = data.toUpperCase();
                productos = await Servicio.find({ "nombre": { $regex: new RegExp(dataUpper)}}).lean();
                if(productos.length<1){
                    const dataLower = data.toLowerCase();
                    productos = await Servicio.find({ "nombre": { $regex: new RegExp(dataLower)}}).lean();
                    if(productos.length<1){
                        const dataUpperLower = data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
                        productos = await Servicio.find({ "nombre": { $regex: new RegExp(dataUpperLower)}}).lean();
                        console.log(dataUpperFirst)
                    }
                }
            }
        }
    }
    res.render('menu/servicio/servicio', {
        productos,
        title:"Productos",
        style:"producto.css"
    });
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
    filtrarServicio
}