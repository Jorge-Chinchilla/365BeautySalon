const Productos = require('../models/productos')

const getProductos = async (req, res) => {
    const productos = await Productos.find().lean();
    res.render('menu/producto/producto', {
        productos,
        title:"login",
        style:"producto.css"
    });
}

const getCreateProducto = (req, res) => {
    res.render('menu/producto/add_producto', {
        title:'Agregar Producto',
        style:'info.css'
    });
}

const getInfoProducto = async (req, res) => {
    const data = req.body
    const infoProducto = await Productos.find({ _id: data.id }).lean();
    infoProducto.forEach(producto => {

        if (producto.fecha.getMinutes() < 10){
            producto.fecha = producto.fecha.toDateString() + " " + producto.fecha.getHours()+":"+producto.fecha.getMinutes()+"0";

        }else{
            producto.fecha = producto.fecha.toDateString() + " " + producto.fecha.getHours()+":"+producto.fecha.getMinutes();
        }
    });
    res.render('menu/producto/info_producto', {
        infoProducto,
        title:'Información Producto',
        style:'info.css'
    });
};

const getEditProducto = async (req, res) => {
    const data = req.body;
    console.log(data);
    const editProducto = await Productos.find({ _id: data.id }).lean();
    res.render('menu/producto/edit_producto', {
        editProducto,
        title:'Editar Producto',
        style:'info.css'
    });
};

const getDeleteProducto = async (req, res) => {
    const data = req.body;
    const delProducto = await Productos.find({ _id: data.id }).lean();
    console.log(delProducto);
    res.render('menu/producto/del_producto', {
        delProducto,
        title:'Eliminar Producto',
        style:'info.css'
    });
}

const createProducto = async (req, res) => {
    const data = req.body;
    const newProducto = new Productos({
        nombre: data.nombre,
        cantidad: data.cantidad,
        precio_compra: data.precio_compra,
        precio_venta: data.precio_venta,
        categoria: data.categoria
    });
    await newProducto.save();
    res.redirect('/producto');
}

const updateProducto = async (req, res) => {
    const { nombre, cantidad, precio_compra, precio_venta, categoria } = req.body;
    await Productos.findByIdAndUpdate(req.params.id, { nombre, cantidad, precio_compra, precio_venta, categoria }).lean();
    res.redirect('/producto')
}

const deleteProducto = async (req, res)=>{
    await Productos.findByIdAndDelete(req.params.id);
    // req.flash("success_msg", "Producto Eliminado");
    res.redirect('/producto');
}

const filtrarProducto = async (req, res) => {
    const data = req.body.nombre
    console.log(data)
    productos = await Productos.find({ "nombre": { $regex: new RegExp(data)}}).lean();

    if(productos.length<1){
        const dataUpperFirst = data.charAt(0).toUpperCase() + data.slice(1);
        productos = await Productos.find({ "nombre": { $regex: new RegExp(dataUpperFirst)}}).lean();
        if(productos.length<1){
            const dataLowerFirst = data.charAt(0).toLowerCase() + data.slice(1);
            productos = await Productos.find({ "nombre": { $regex: new RegExp(dataLowerFirst)}}).lean();
            if(productos.length<1){
                const dataUpper = data.toUpperCase();
                productos = await Productos.find({ "nombre": { $regex: new RegExp(dataUpper)}}).lean();
                if(productos.length<1){
                    const dataLower = data.toLowerCase();
                    productos = await Productos.find({ "nombre": { $regex: new RegExp(dataLower)}}).lean();
                    if(productos.length<1){
                        const dataUpperLower = data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
                        productos = await Productos.find({ "nombre": { $regex: new RegExp(dataUpperLower)}}).lean();
                    }
                }
            }
        }
    }
    res.render('menu/producto/producto', {
        productos,
        title:"Productos",
        style:"producto.css"
    });
}

module.exports = {
    getProductos,
    getCreateProducto,
    getInfoProducto,
    getEditProducto,
    getDeleteProducto,
    createProducto,
    updateProducto,
    deleteProducto,
    filtrarProducto
}