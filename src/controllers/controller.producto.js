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
        style:'add_producto.css'
    });
}

const getInfoProducto = async (req, res) => {
    const param = req.params.id;
    const infoProducto = await Productos.find({ id: param }).lean();
    res.render('menu/producto/info_producto', { infoProducto });
};

const getEditProducto = async (req, res) => {
    const param = req.params.id;
    const editProducto = await Productos.find({ id: param }).lean();
    res.render('menu/producto/edit_producto', { editProducto });
};

const getDeleteProducto = async (req, res) => {
    const param = req.params.id;
    const delProducto = await Productos.find({ id: param }).lean();
    res.render('menu/producto/del_producto', { delProducto });
}

const createProducto = async (req, res) => {
    const data = req.body;
    const newProducto = new Productos({
        id: data.id,
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
    const { id, nombre, cantidad, precio_compra, precio_venta, categoria } = req.body;
    await Productos.findByIdAndUpdate(req.params.id, { id, nombre, cantidad, precio_compra, precio_venta, categoria }).lean();
    res.redirect('/producto')
}

const deleteProducto = async (req, res)=>{
    await Productos.findByIdAndDelete(req.params.id);
    // req.flash("success_msg", "Producto Eliminado");
    res.redirect('/producto');
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
}