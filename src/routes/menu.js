const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add_producto', (req,res)=>{
    res.render('menu/add_producto');
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
    res.send('recibido');
});

router.get('/lista_producto', async (req, res)=>{
    const productos = await pool.query('select * from productos');
    res.render('menu/lista_producto', {productos})
})

router.get('/', async (req, res)=>{
    res.render('menu/menu');
})


module.exports = router;