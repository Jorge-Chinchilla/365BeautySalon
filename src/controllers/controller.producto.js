const Productos = require('../models/productos')

const getProductos = async (req, res) => {
    const productos = await Productos.find().lean();
    res.render('menu/producto/producto', { productos });
}

const getCreateProducto = (req, res) => {
    res.render('menu/producto/add_producto');
}

const getInfoProducto = async (req, res) => {
    const param = req.params.id;
    const infoProducto = await Productos.find({id: param}).lean();
    res.render('menu/producto/info_producto', {infoProducto});
};

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
    res.redirect('/menu/producto');
}

/*router.get('/edit_producto', async (req, res) => {
    const editProducto = await Productos.findById(req.params.id).lean();
    console.log(editProducto);
    res.render('menu/producto/edit_producto', { editProducto });
});*/


/*const getUpdateProducto = (req, res) => {
    const param = req.params.id
    Producto.find({_id: param}, (err, result)=>{
        if (err) {
            console.log('Ha ocurrido un error: '+err)
        }else{
            console.log(result)
            res.render('update-producto', {producto:result})
        }
    })
}*/

/*const getDeleteProducto = (req, res) => {
    const param = req.params.id
    Producto.find({_id:param}, (err, result)=>{
        if (err) {
            console.log('Ha ocurrido un error: '+err)
        }else{
            console.log(result)
            res.render('delete-producto', {producto:result})
        }
})}*/

/*const updateProducto = (req, res)=>{
    const param = req.params.id
    const data = req.body
    Producto.findOneAndUpdate({_id:param}, data, (err, result)=>{
        if (err) {
            console.log('Ha ocurrido un error: '+err)
        }else{
            console.log('Producto actualizado')
            res.redirect('/productos/all')
        }
    })
}

const deleteProducto = (req, res)=>{
    const param = req.params.id
    Producto.deleteOne({_id:param}, (err, result)=>{
        if (err) {
            console.log('Ha ocurrido un error: '+err)
        }else{
            console.log('Producto actualizado')
            res.redirect('/productos/all')
        }
    })
}*/

module.exports = {
    getProductos,
    getCreateProducto,
    getInfoProducto,
    createProducto,
}