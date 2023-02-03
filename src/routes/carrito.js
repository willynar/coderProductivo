import express from 'express'
import { logger } from '../config/logger.js';
const router = express.Router()

import { ContenedorDaoCarritos, ContenedorDaoLogins, ContenedorDaoEmails, ContenedorDaoWhatsap } from "../daos/index.js";
const carritosApi = ContenedorDaoCarritos;
const userApi = ContenedorDaoLogins;
const correoApi = ContenedorDaoEmails;
const whatsappApi = ContenedorDaoWhatsap;


router.post('/', async (req, res) => {
    res.status(200).json(await carritosApi.save(req.body))
})

router.delete('/:id', async (req, res) => {
    res.status(200).json(await carritosApi.deleteById(req.params.id))
})

router.get('/:id/productos', async (req, res) => {
    res.status(200).json(await carritosApi.getByIdProductos(req.params.id))
})

router.post('/:id/productos', async (req, res) => {
    res.status(200).json(await carritosApi.saveProductos({ id: req.params.id, producto: req.body }))
})

router.delete('/:id/productos/:id_prod', async (req, res) => {
    res.status(200).json(await carritosApi.deleteByIdProducto(req.params.id, req.params.id_prod))
})

router.get('/:id/comprar/:id_user', async (req, res) => {
    let carrito = await carritosApi.getByIdProductos(req.params.id);
    let usuario = await userApi.getAllById(req.params.id_user);

    correoApi.enviarCorreoCompraCarrito(carrito, usuario);
    whatsappApi.enviarWhatsappCompra(carrito, usuario);
    res.status(200).json({ descripcion: `!Pedido: ${req.params.id}. realizado¡` })
})

export default { router };