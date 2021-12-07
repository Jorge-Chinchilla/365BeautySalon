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
        style:'info.css'
    });
}

const getInfoServicio = async (req, res) => {
    const data = req.body;
    const infoServicio = await Servicio.find({ _id: data.id }).lean();

    infoServicio.forEach(servicios => {
        if (servicios.fecha.getMinutes() < 10){
            servicios.fecha = servicios.fecha.toDateString() + " " + servicios.fecha.getHours()+":"+servicios.fecha.getMinutes()+"0";
        }else{
            servicios.fecha = servicios.fecha.toDateString() + " " + servicios.fecha.getHours()+":"+servicios.fecha.getMinutes();
        }
    });

    res.render('menu/servicio/info_servicio', {
        infoServicio,
        title:'Agregar Servicio',
        style:'info.css'
    });
};

const getEditServicio = async (req, res) => {
    const data = req.body;
    const editServicio = await Servicio.find({ _id: data.id }).lean();
    res.render('menu/servicio/edit_servicio', {
        editServicio,
        title:'editar Servicio',
        style:'info.css'
    });
};

const getDeleteServicio = async (req, res) => {
    const data = req.body;
    const delServicio = await Servicio.find({ _id: data.id }).lean();
    res.render('menu/servicio/del_servicio', {
        delServicio,
        title:'Eliminar servicio',
        style:'info.css'
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
    const { nombre, precio} = req.body;
    await Servicio.findByIdAndUpdate(req.params.id, { nombre, precio}).lean();
    res.redirect('/servicio')
}

const deleteServicio = async (req, res)=>{
    await Servicio.findByIdAndDelete(req.params.id);
    // req.flash("success_msg", "Producto Eliminado");
    res.redirect('/servicio');
}

const filtrarServicio = async (req, res) => {
    const data = req.body.nombre
    console.log(data)
    servicio = await Servicio.find({ nombre: { $regex: new RegExp(data)}}).lean();
    console.log(servicio.length)
    if(servicio.length<1){
        const dataUpperFirst = data.charAt(0).toUpperCase() + data.slice(1);
        console.log(dataUpperFirst)
        servicio = await Servicio.find({ nombre: { $regex: new RegExp(dataUpperFirst)}}).lean();
        if(servicio.length<1){
            const dataLowerFirst = data.charAt(0).toLowerCase() + data.slice(1);
            servicio = await Servicio.find({ nombre: { $regex: new RegExp(dataLowerFirst)}}).lean();
            if(servicio.length<1){
                const dataUpper = data.toUpperCase();
                servicio = await Servicio.find({ nombre: { $regex: new RegExp(dataUpper)}}).lean();
                if(servicio.length<1){
                    const dataLower = data.toLowerCase();
                    servicio = await Servicio.find({ nombre: { $regex: new RegExp(dataLower)}}).lean();
                    if(servicio.length<1){
                        const dataUpperLower = data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
                        servicio = await Servicio.find({ nombre: { $regex: new RegExp(dataUpperLower)}}).lean();
                        console.log(dataUpperFirst)
                    }
                }
            }
        }
    }
    res.render('menu/servicio/servicio', {
        servicio,
        title:"Servicio",
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