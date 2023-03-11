import express from 'express'
import * as productosController from '../../controllers/productos.controller.js'

const router = express.Router()

//midewre para no actualizar guardar o borrar si no es admin
const myLogger = function (req, res, next) {
    let admin = req.header('AdminMode') == 'true'
    if (admin) {
        next()
    }else{
        res.status(401).json({descripcion:`ruta no autorizada ${req.originalUrl}`})
    }
}

router.get('/', productosController.getAll)

router.get('/:id', productosController.getById)

router.post('/', myLogger,  productosController.save)

router.put('/', myLogger, productosController.updateById)

router.delete('/:id', myLogger, productosController.deleteById)

export default { router, productosController };