import express from 'express'
import * as viewsController from '../controllers/views.controller.js'

const router = express.Router()

const myLogger = function (req, res, next) {
    if (req.session.passport !== undefined) {
        next()
    } else {
        res.redirect("/login-user")
    }
}

router.get('/', myLogger, viewsController.guardar)

router.get('/home', myLogger, viewsController.home)

router.get('/cargados/', myLogger, viewsController.cargados)

router.get('/carritoView/', myLogger,viewsController.carritoView)

router.get('/actualizar/:id_pro',myLogger,viewsController.actualizaProducto)

router.get('/perfil/:id',myLogger, viewsController.perfil)

router.get('/chat/', myLogger,viewsController.chat)

router.get('/info', myLogger, viewsController.info)

router.get('/login-user', viewsController.loginUser)

router.get('/registro',viewsController.registro)

router.get('/bye/',viewsController.bye)

router.get('/erroPage', viewsController.errorPage)

export default { router };