import express from 'express'
const router = express.Router()

import {ContenedorDaoCarritos} from "../daos/index.js";
const carritosApi = ContenedorDaoCarritos;



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
    res.status(200).json(await carritosApi.deleteByIdProducto( req.params.id , req.params.id_prod ))
})


export default { router };