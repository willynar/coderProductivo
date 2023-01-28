import express from 'express'
const router = express.Router()
import { options } from "../config/appConfig.js";

import { ContenedorDaoProductos } from "../daos/index.js";
const productosApi = ContenedorDaoProductos;

const myLogger = function (req, res, next) {
    console.log(req.session.passport)
    if (req.session.passport !== undefined) {
        next()
    } else {
        res.redirect("/login-user")
    }
}

router.get('/', myLogger, async (req, res) => {
    res.render('main', { layout: 'guardar' })
})

router.get('/home', myLogger, async (req, res) => {
    res.render('main', { layout: 'index' })
})

router.get('/cargados/', myLogger, async (req, res) => {

    res.render('main', { layout: 'productos' })
})

router.get('/carritoView/', myLogger, async (req, res) => {

    res.render('main', { layout: 'carrito' })
})

router.get('/actualizar/:id_pro',myLogger, async (req, res) => {
    let dat = await productosApi.getById(req.params.id_pro);
    dat.id = req.params.id_pro;
    res.render('main', { layout: 'actualizar', data: dat })
})

router.get('/info', myLogger, async (req, res) => {
    res.render('main', { layout: 'info', objeto: options.infoApp })
})

router.get('/login-user', async (req, res) => {
    res.render('main', { layout: 'login' })
})

router.get('/registro', async (req, res) => {
    res.render('main', { layout: 'singup' })
})

router.get('/bye/', async (req, res) => {
    res.render('main', { layout: 'bye' })
})

router.get('/erroPage', async (req, res) => {
    let erroMesage = req.session.messages ? req.session.messages[0] : ''
    res.render('main', { layout: 'error', error: erroMesage })
    req.session.messages = [];

})



export default { router };