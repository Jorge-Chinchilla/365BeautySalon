const Empleados = require('../models/empleados')

const getEmpleado = async (req, res) => {
    const empleados = await Empleados.find().lean();
    res.render('menu/empleado/empleado', { empleados });
}

const getCreateEmpleado = (req, res) => {
    res.render('menu/empleado/add_empleado');
}

const getInfoEmpleado = async (req, res) => {
    const param = req.params.id;
    const infoEmpleado = await Empleados.find({ id: param }).lean();
    res.render('menu/empleado/info_empleado', { infoEmpleado });
};

const getEditEmpleado = async (req, res) => {
    const param = req.params.id;
    const editEmpleado = await Empleados.find({ _id: param }).lean();
    res.render('menu/empleado/edit_empleado', { editEmpleado });
};

const getDeleteEmpleado = async (req, res) => {
    const param = req.params.id;
    const delEmpleado = await Empleados.find({ _id: param }).lean();
    res.render('menu/empleado/del_empleado', { delEmpleado });
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
    res.redirect('/menu/empleado');
}

const updateEmpleado = async (req, res) => {
    const { id, nombre, apellido, telefono, correo } = req.body;
    await Empleados.findByIdAndUpdate(req.params.id, { id, nombre, apellido, telefono, correo }).lean();
    res.redirect('/menu/empleado')
}

const deleteEmpleado = async (req, res)=>{
    await Empleados.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Datos de Empleado Eliminados");
    res.redirect('/menu/empleado');
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
}