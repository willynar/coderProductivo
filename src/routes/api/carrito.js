import express from 'express'
import * as carritosController from '../../controllers/carritos.controller.js'

const router = express.Router()

router.post('/', carritosController.save)

router.delete('/:id', carritosController.deleteById)

router.get('/:id/productos', carritosController.getByIdProductos)

router.post('/:id/productos', carritosController.saveProductos)

router.delete('/:id/productos/:id_prod', carritosController.deleteByIdProducto)

router.get('/:id/comprar/:id_user', carritosController.comprar)

export default { router };