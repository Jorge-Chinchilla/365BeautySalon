const Cita = require('../models/citas')
const Servicio = require('../models/servicios')

const getCita = async (req, res) => {
    const cita = await Cita.find().lean();
    cita.forEach(citas => {

        if (citas.fecha_cita.getMinutes() < 10){
            citas.fecha_cita = citas.fecha_cita.toDateString() + " " + citas.fecha_cita.getHours()+":"+citas.fecha_cita.getMinutes()+"0";

        }else{
            citas.fecha_cita = citas.fecha_cita.toDateString() + " " + citas.fecha_cita.getHours()+":"+citas.fecha_cita.getMinutes();
        }
    });
    res.render('menu/Citas/cita', {
        cita,
        title:"login",
        style:"producto.css"
    });
}

const getCreateCita = async (req, res) => {
    const servicio = await Servicio.find().lean();
    res.render('menu/Citas/add_cita', {
        servicio,
        title:'Agregar Cita',
        style:'add_servicio.css'
    });
}

const getInfoCita = async (req, res) => {
    const data = req.body;
    const infoCita = await Cita.find({ _id: data.id }).lean();
    infoCita.forEach(citas => {

        if (citas.fecha_cita.getMinutes() < 10){
            citas.fecha_cita = citas.fecha_cita.toDateString() + " " + citas.fecha_cita.getHours()+":"+citas.fecha_cita.getMinutes()+"0";

        }else{
            citas.fecha_cita = citas.fecha_cita.toDateString() + " " + citas.fecha_cita.getHours()+":"+citas.fecha_cita.getMinutes();
        }
        if (citas.fecha.getMinutes() < 10){
            citas.fecha = citas.fecha.toDateString() + " " + citas.fecha.getHours()+":"+citas.fecha.getMinutes()+"0";

        }else{
            citas.fecha = citas.fecha.toDateString() + " " + citas.fecha.getHours()+":"+citas.fecha.getMinutes();
        }
    });
    res.render('menu/Citas/info_cita', {
        infoCita,
        title:'Agregar Cita',
        style:'add_servicio.css'
    });
};

const getEditCita = async (req, res) => {
    const data = req.body;
    const editCita = await Cita.find({ _id: data.id }).lean();
    const servicio = await Servicio.find().lean();
    res.render('menu/Citas/edit_cita', {
        editCita,
        servicio,
        title:'Agregar Cita',
        style:'add_servicio.css'
    });
};

const getDeleteCita = async (req, res) => {
    const data = req.body;
    const delCita = await Cita.find({ _id: data.id }).lean();
    res.render('menu/Citas/del_cita', { delCita });
}

const createCita = async (req, res) => {
    const data = req.body;
    const newCita = new Cita({
        nombre: data.nombre,
        correo: data.correo,
        numero: data.numero,
        servicio: data.servicio,
        fecha_cita: data.fecha_cita,
        fecha: data.fecha,
    });
    await newCita.save();
    res.redirect('/cita');
}

const updateCita = async (req, res) => {
    const { nombre, correo, numero, servicio, fecha } = req.body;
    await Cita.findByIdAndUpdate(req.params.id, { nombre, correo, numero, servicio,fecha }).lean();
    res.redirect('/cita')
}

const deleteCita = async (req, res)=>{
    await Cita.findByIdAndDelete(req.params.id);
    // req.flash("success_msg", "Producto Eliminado");
    res.redirect('/cita');
}

module.exports = {
    getCita,
    getCreateCita,
    getInfoCita,
    getEditCita,
    getDeleteCita,
    createCita,
    updateCita,
    deleteCita,
}