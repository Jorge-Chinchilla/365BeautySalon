const Empleados = require('../models/empleados')
const Productos = require("../models/productos");

const getEmpleado = async (req, res) => {
    const empleados = await Empleados.find().lean();
    res.render('menu/empleado/empleado', {
        empleados,
        title: 'Empleados',
        style: 'producto.css'
    });
}

const getCreateEmpleado = (req, res) => {
    res.render('menu/empleado/add_empleado', {
        title: 'Agregar',
        style: 'info.css'
    });
}

const getInfoEmpleado = async (req, res) => {
    const data = req.body;
    const infoEmpleado = await Empleados.find({ id: data.id }).lean();
    res.render('menu/empleado/info_empleado', {
        infoEmpleado,
        title: 'Informacion Empleado',
        style: 'info.css'
    });
};

const getEditEmpleado = async (req, res) => {
    const data = req.body;
    const editEmpleado = await Empleados.find({ id: data.id  }).lean();
    res.render('menu/empleado/edit_empleado', {
        editEmpleado,
        title: 'Editar Empleado',
        style: 'info.css'
    });
};

const getDeleteEmpleado = async (req, res) => {
    const param = req.params.id;
    const data = req.body;
    const delEmpleado = await Empleados.find({ id: data.id  }).lean();
    res.render('menu/empleado/del_empleado', {
        delEmpleado,
        title: 'Eliminar Empleado',
        style: 'info.css'
    });
}

const createEmpleado = async (req, res) => {
    const data = req.body;
    const newEmpleado = new Empleados({
        id: data.id,
        nombre: data.nombre,
        apellido: data.apellido,
        telefono: data.telefono,
        correo: data.correo,
        cargo: data.cargo,
    });
    await newEmpleado.save();
    res.redirect('/empleado');
}

const updateEmpleado = async (req, res) => {
    const { id, nombre, apellido, telefono, correo, cargo } = req.body;
    await Empleados.findByIdAndUpdate(req.params.id, { id, nombre, apellido, telefono, correo, cargo }).lean();
    res.redirect('/empleado')
}

const deleteEmpleado = async (req, res)=>{
    await Empleados.findByIdAndDelete(req.params.id);
    // req.flash("success_msg", "Datos de Empleado Eliminados");
    res.redirect('/empleado');
}

const filtrarEmpleado = async (req, res) => {
    const data = req.body.nombre;
    console.log(data);
    empleados = await Empleados.find({ "nombre": { $regex: new RegExp(data)}}).lean();

    if(empleados.length<1){
        const dataUpperFirst = data.charAt(0).toUpperCase() + data.slice(1);
        empleados = await Empleados.find({ "nombre": { $regex: new RegExp(dataUpperFirst)}}).lean();
        if(empleados.length<1){
            const dataLowerFirst = data.charAt(0).toLowerCase() + data.slice(1);
            empleados = await Empleados.find({ "nombre": { $regex: new RegExp(dataLowerFirst)}}).lean();
            if(empleados.length<1){
                const dataUpper = data.toUpperCase();
                empleados = await Empleados.find({ "nombre": { $regex: new RegExp(dataUpper)}}).lean();
                if(empleados.length<1){
                    const dataLower = data.toLowerCase();
                    empleados = await Empleados.find({ "nombre": { $regex: new RegExp(dataLower)}}).lean();
                    if(empleados.length<1){
                        const dataUpperLower = data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
                        empleados = await Empleados.find({ "nombre": { $regex: new RegExp(dataUpperLower)}}).lean();
                    }
                }
            }
        }
    }
    res.render('menu/empleado/empleado', {
        empleados,
        title:"Empleados",
        style:"producto.css"
    });
}

module.exports = {
    getEmpleado,
    getCreateEmpleado,
    getInfoEmpleado,
    getEditEmpleado,
    getDeleteEmpleado,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado,
    filtrarEmpleado,
}