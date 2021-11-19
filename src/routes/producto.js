const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/authRoutes');

router.get('/producto', isLoggedIn, async (req, res)=>{
    const productos = await pool.query('select * from productos');
    res.render('menu/producto/producto', {productos})
});

router.get('/info_producto/:id', isLoggedIn, async (req, res)=>{
    const {id} = req.params;
    const infoProducto = await pool.query('select * from productos where id = ?', [id]);
    res.render('menu/producto/info_producto', {infoProducto: infoProducto[0]});
});

router.get('/add_producto', isLoggedIn, (req,res)=>{
    res.render('menu/producto/add_producto');
});

router.post('/add_producto', async (req, res)=>{
    const { id, nombre, cantidad, precio_compra, precio_venta, categoria_id } = req.body;
    const newProducto = {
        id,
        nombre, 
        cantidad, 
        precio_compra, 
        precio_venta, 
        categoria_id 
    };
    await pool.query('insert into productos set ?', [newProducto]);
    res.redirect('producto');
});

module.exports = router;