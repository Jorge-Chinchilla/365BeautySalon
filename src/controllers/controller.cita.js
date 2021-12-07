const Cita = require('../models/citas');
const Servicio = require('../models/servicios');

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
        title:"Citas",
        style:"producto.css"
    });
}
const getCitaPen = async (req, res) => {
    const penCita = await Cita.find({ estado: "Pendiente"}).lean();
    penCita.forEach(citas => {
        if (citas.fecha_cita.getMinutes() < 10){
            citas.fecha_cita = citas.fecha_cita.toDateString() + " " + citas.fecha_cita.getHours()+":"+citas.fecha_cita.getMinutes()+"0";
        }else{
            citas.fecha_cita = citas.fecha_cita.toDateString() + " " + citas.fecha_cita.getHours()+":"+citas.fecha_cita.getMinutes();
        }
    });
    res.render('menu/Citas/pen_cita', {
        penCita,
        title:"Citas",
        style:"producto.css"
    });
}

const getCitaCan = async (req, res) => {
    const canCita = await Cita.find({ estado: "Cancelado"}).lean();
    canCita.forEach(citas => {
        if (citas.fecha_cita.getMinutes() < 10){
            citas.fecha_cita = citas.fecha_cita.toDateString() + " " + citas.fecha_cita.getHours()+":"+citas.fecha_cita.getMinutes()+"0";
        }else{
            citas.fecha_cita = citas.fecha_cita.toDateString() + " " + citas.fecha_cita.getHours()+":"+citas.fecha_cita.getMinutes();
        }
    });
    res.render('menu/Citas/cancel_cita', {
        canCita,
        title:"Citas",
        style:"producto.css"
    });
}

const getCitaFin = async (req, res) => {
    const finCita = await Cita.find({ estado: "Finalizado"}).lean();
    finCita.forEach(citas => {
        if (citas.fecha_cita.getMinutes() < 10){
            citas.fecha_cita = citas.fecha_cita.toDateString() + " " + citas.fecha_cita.getHours()+":"+citas.fecha_cita.getMinutes()+"0";
        }else{
            citas.fecha_cita = citas.fecha_cita.toDateString() + " " + citas.fecha_cita.getHours()+":"+citas.fecha_cita.getMinutes();
        }
    });
    res.render('menu/Citas/fin_cita', {
        finCita,
        title:"Citas",
        style:"producto.css"
    });
}

const getCreateCita = async (req, res) => {
    const servicio = await Servicio.find().lean();
    res.render('menu/Citas/add_cita', {
        servicio,
        title:'Agregar Cita',
        style:'info.css'
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
        title:'Informacion de Cita',
        style:'info.css'
    });
};

const getInfoCitaPen = async (req, res) => {
    const data = req.body;
    const infoCitaPen = await Cita.find({ _id: data.id }).lean();
    infoCitaPen.forEach(citas => {
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
    res.render('menu/Citas/info_cita_pen', {
        infoCitaPen,
        title:'Informacion de Cita',
        style:'info.css'
    });
};

const getEditCita = async (req, res) => {
    const data = req.body;
    const editCita = await Cita.find({ _id: data.id }).lean();
    const servicio = await Servicio.find().lean();
    res.render('menu/Citas/edit_cita', {
        editCita,
        servicio,
        title:'Editar Cita',
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
        estado: data.estado,
        fecha_cita: data.fecha_cita,
        fecha: data.fecha,
    });
    await newCita.save();
    res.redirect('/pen_cita');
}

const updateCita = async (req, res) => {
    const { nombre, correo, numero, servicio, fecha_cita, estado } = req.body;
    await Cita.findByIdAndUpdate(req.params._id, { nombre, correo, numero, servicio, fecha_cita, estado }).lean();
    res.redirect('/pen_cita')
}

const deleteCita = async (req, res)=>{
    await Cita.findByIdAndDelete(req.params.id);
    res.redirect('/cita');
}

const filtrarCitas = async (req, res) => {
    const data = req.body.nombre;
    cita = await Cita.find({ nombre: { $regex: new RegExp(data)}}).lean();
    if(cita.length<1){
        const dataUpperFirst = data.charAt(0).toUpperCase() + data.slice(1);
        cita = await Cita.find({ nombre: { $regex: new RegExp(dataUpperFirst)}}).lean();
        if(cita.length<1){
            const dataLowerFirst = data.charAt(0).toLowerCase() + data.slice(1);
            cita = await Cita.find({ nombre: { $regex: new RegExp(dataLowerFirst)}}).lean();
            if(cita.length<1){
                const dataUpper = data.toUpperCase();
                cita = await Cita.find({ nombre: { $regex: new RegExp(dataUpper)}}).lean();
                if(cita.length<1){
                    const dataLower = data.toLowerCase();
                    cita = await Cita.find({ nombre: { $regex: new RegExp(dataLower)}}).lean();
                    if(cita.length<1){
                        const dataUpperLower = data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
                        cita = await Cita.find({ nombre: { $regex: new RegExp(dataUpperLower)}}).lean();
                    }
                }
            }
        }
    }
    cita.forEach(citas => {
        if (citas.fecha_cita.getMinutes() < 10){
            citas.fecha_cita = citas.fecha_cita.toDateString() + " " + citas.fecha_cita.getHours()+":"+citas.fecha_cita.getMinutes()+"0";
        }else{
            citas.fecha_cita = citas.fecha_cita.toDateString() + " " + citas.fecha_cita.getHours()+":"+citas.fecha_cita.getMinutes();
        }
    });
    res.render('menu/Citas/cita', {
        cita,
        title:"Productos",
        style:"producto.css"
    });
}

const filtrarCitasPen = async (req, res) => {
    const data = req.body.nombre;
    cita = await Cita.find({ nombre: { $regex: new RegExp(data)}}).lean();
    if(cita.length<1){
        const dataUpperFirst = data.charAt(0).toUpperCase() + data.slice(1);
        cita = await Cita.find({ nombre: { $regex: new RegExp(dataUpperFirst)}}).lean();
        if(cita.length<1){
            const dataLowerFirst = data.charAt(0).toLowerCase() + data.slice(1);
            cita = await Cita.find({ nombre: { $regex: new RegExp(dataLowerFirst)}}).lean();
            if(cita.length<1){
                const dataUpper = data.toUpperCase();
                cita = await Cita.find({ nombre: { $regex: new RegExp(dataUpper)}}).lean();
                if(cita.length<1){
                    const dataLower = data.toLowerCase();
                    cita = await Cita.find({ nombre: { $regex: new RegExp(dataLower)}}).lean();
                    if(cita.length<1){
                        const dataUpperLower = data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
                        cita = await Cita.find({ nombre: { $regex: new RegExp(dataUpperLower)}}).lean();
                    }
                }
            }
        }
    }
    penCita=[];
    cita.forEach(citas => {
        if (citas.estado == "Pendiente"){
            penCita.push(citas);
        }
    });
    penCita.forEach(citas => {
        if (citas.fecha_cita.getMinutes() < 10){
            citas.fecha_cita = citas.fecha_cita.toDateString() + " " + citas.fecha_cita.getHours()+":"+citas.fecha_cita.getMinutes()+"0";
        }else{
            citas.fecha_cita = citas.fecha_cita.toDateString() + " " + citas.fecha_cita.getHours()+":"+citas.fecha_cita.getMinutes();
        }
    });
    res.render('menu/Citas/pen_cita', {
        penCita,
        title:"Productos",
        style:"producto.css"
    });
}

const filtrarCitasCan = async (req, res) => {
    const data = req.body.nombre;
    cita = await Cita.find({ nombre: { $regex: new RegExp(data)}}).lean();
    if(cita.length<1){
        const dataUpperFirst = data.charAt(0).toUpperCase() + data.slice(1);
        cita = await Cita.find({ nombre: { $regex: new RegExp(dataUpperFirst)}}).lean();
        if(cita.length<1){
            const dataLowerFirst = data.charAt(0).toLowerCase() + data.slice(1);
            cita = await Cita.find({ nombre: { $regex: new RegExp(dataLowerFirst)}}).lean();
            if(cita.length<1){
                const dataUpper = data.toUpperCase();
                cita = await Cita.find({ nombre: { $regex: new RegExp(dataUpper)}}).lean();
                if(cita.length<1){
                    const dataLower = data.toLowerCase();
                    cita = await Cita.find({ nombre: { $regex: new RegExp(dataLower)}}).lean();
                    if(cita.length<1){
                        const dataUpperLower = data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
                        cita = await Cita.find({ nombre: { $regex: new RegExp(dataUpperLower)}}).lean();
                    }
                }
            }
        }
    }
    canCita=[];
    cita.forEach(citas => {
        if (citas.estado == "Cancelado"){
            canCita.push(citas);
        }
    });
    console.log(canCita)
    canCita.forEach(citas => {
        if (citas.fecha_cita.getMinutes() < 10){
            citas.fecha_cita = citas.fecha_cita.toDateString() + " " + citas.fecha_cita.getHours()+":"+citas.fecha_cita.getMinutes()+"0";
        }else{
            citas.fecha_cita = citas.fecha_cita.toDateString() + " " + citas.fecha_cita.getHours()+":"+citas.fecha_cita.getMinutes();
        }
    });
    res.render('menu/Citas/cancel_cita', {
        canCita,
        title:"Productos",
        style:"producto.css"
    });
}

const filtrarCitasFin = async (req, res) => {
    const data = req.body.nombre;
    cita = await Cita.find({ nombre: { $regex: new RegExp(data)}}).lean();
    if(cita.length<1){
        const dataUpperFirst = data.charAt(0).toUpperCase() + data.slice(1);
        cita = await Cita.find({ nombre: { $regex: new RegExp(dataUpperFirst)}}).lean();
        if(cita.length<1){
            const dataLowerFirst = data.charAt(0).toLowerCase() + data.slice(1);
            cita = await Cita.find({ nombre: { $regex: new RegExp(dataLowerFirst)}}).lean();
            if(cita.length<1){
                const dataUpper = data.toUpperCase();
                cita = await Cita.find({ nombre: { $regex: new RegExp(dataUpper)}}).lean();
                if(cita.length<1){
                    const dataLower = data.toLowerCase();
                    cita = await Cita.find({ nombre: { $regex: new RegExp(dataLower)}}).lean();
                    if(cita.length<1){
                        const dataUpperLower = data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
                        cita = await Cita.find({ nombre: { $regex: new RegExp(dataUpperLower)}}).lean();
                    }
                }
            }
        }
    }

    finCita=[];
    cita.forEach(citas => {
        if (citas.estado == "Finalizado"){
            finCita.push(citas);
        }
    });
    finCita.forEach(citas => {
        if (citas.fecha_cita.getMinutes() < 10){
            citas.fecha_cita = citas.fecha_cita.toDateString() + " " + citas.fecha_cita.getHours()+":"+citas.fecha_cita.getMinutes()+"0";
        }else{
            citas.fecha_cita = citas.fecha_cita.toDateString() + " " + citas.fecha_cita.getHours()+":"+citas.fecha_cita.getMinutes();
        }
    });
    res.render('menu/Citas/fin_cita', {
        finCita,
        title:"Productos",
        style:"producto.css"
    });
}

const getCreateClienteCita = async (req, res) => {
    const servicio = await Servicio.find().lean();
    res.render('landing/clientes_cita', {
        servicio,
        title:'Agendar',
        style:'clientes_cita.css'
    });
}

const createClienteCita = async (req, res) => {
    const data = req.body;
    const newCita = new Cita({
        nombre: data.nombre,
        correo: data.correo,
        numero: data.numero,
        servicio: data.servicio,
        estado: data.estado,
        fecha_cita: data.fecha_cita,
        fecha: data.fecha,
    });
    await newCita.save();
    res.render('landing/exito_cita', {
        title:"Cita agendada",
        style:"clientes_cita.css"
    });
}

module.exports = {
    getCita,
    getCitaPen,
    getCitaCan,
    getCitaFin,
    getCreateCita,
    getInfoCita,
    getInfoCitaPen,
    getEditCita,
    getDeleteCita,
    createCita,
    updateCita,
    deleteCita,
    filtrarCitas,
    filtrarCitasPen,
    filtrarCitasCan,
    filtrarCitasFin,
    getCreateClienteCita,
    createClienteCita
}