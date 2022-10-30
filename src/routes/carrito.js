import express from 'express'
const router = express.Router()

import ContenedorCarrito from '../logic/contenedorCarrito.js'
const cont = new ContenedorCarrito('carrito')


router.post('/', async (req, res) => {
    res.status(200).json(await cont.save(req.body))
})

router.delete('/:id', async (req, res) => {
    res.status(200).json(await cont.deleteById(parseInt(req.params.id)))
})

router.get('/:id/productos', async (req, res) => {
    res.status(200).json(await cont.getByIdProductos(parseInt(req.params.id)))
})

router.post('/:id/productos', async (req, res) => {
    res.status(200).json(await cont.saveProductos({ id: parseInt(req.params.id), producto: req.body }))
})

router.delete('/:id/productos/:id_prod', async (req, res) => {
    res.status(200).json(await cont.deleteByIdProducto( parseInt(req.params.id) , parseInt(req.params.id_prod) ))
})


export default { router };