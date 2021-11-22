const express = require('express');
const router = express.Router();

const Productos = require('../models/productos');
const { isAuthenticated } = require('../lib/helpers');

router.get('/producto', async (req, res) => {
    const productos = await Productos.find().lean();
    res.render('menu/producto/producto', { productos });
});

router.get('/add_producto', (req, res) => {
    res.render('menu/producto/add_producto');
});

router.get('/info_producto/:id', async (req, res) => {
    const infoProducto = await Productos.findById(req.params.id).lean();
    console.log(infoProducto);
    res.render('menu/producto/info_producto', { infoProducto });
});

router.get('/edit_producto', async (req, res) => {
    const editProducto = await Productos.findById(req.params.id).lean();
    console.log(editProducto);
    res.render('menu/producto/edit_producto', { editProducto });
});


router.post('/add_producto', async (req, res) => {
    const { _id, nombre, cantidad, precio_compra, precio_venta, categoria } = req.body;
    const newProducto = new Productos({ _id, nombre, cantidad, precio_compra, precio_venta, categoria });
    await newProducto.save();
    res.redirect('/menu/producto');
});

module.exports = router;