import { logger } from '../config/logger.js'
import { options } from "../config/app.Config.js";

import * as productosService from '../services/productos.service.js'
import * as loginService from '../services/login.service.js'

export const guardar = async (req, res) => {
    try {
        res.render('main', { layout: 'guardar' })
    } catch (error) {
        logger.error(error)
    }
}

export const home = async (req, res) => {
    try {
        res.render('main', { layout: 'index' })
    } catch (error) {
        logger.error(error)
    }
}

export const cargados = async (req, res) => {
    try {
        res.render('main', { layout: 'productos' })
    } catch (error) {
        logger.error(error)
    }
}

export const carritoView = async (req, res) => {
    try {
        res.render('main', { layout: 'carrito' })
    } catch (error) {
        logger.error(error)
    }
}

export const actualizaProducto = async (req, res) => {
    try {
        let dat = await productosService.getById(req.params.id_pro);
        dat.id = req.params.id_pro;
        res.render('main', { layout: 'actualizar', data: dat })
    } catch (error) {
        logger.error(error)
    }
}

export const perfil = async (req, res) => {
    try {
        let dat = await loginService.getAllById(req.params.id);
        res.render('main', { layout: 'perfil', objeto: dat })
    } catch (error) {
        logger.error(error)
    }
}

export const chat = async (req, res) => {
    try {
        res.render('main', { layout: 'chat' })
    } catch (error) {
        logger.error(error)
    }
}

export const info = async (req, res) => {
    try {
        res.render('main', { layout: 'info', objeto: options.infoApp })
    } catch (error) {
        logger.error(error)
    }
}

export const loginUser = async (req, res) => {
    try {
        res.render('main', { layout: 'login' })
    } catch (error) {
        logger.error(error)
    }
}

export const registro = async (req, res) => {
    try {
        res.render('main', { layout: 'singup' })
    } catch (error) {
        logger.error(error)
    }
}

export const bye = async (req, res) => {
    try {
        res.render('main', { layout: 'bye' })
    } catch (error) {
        logger.error(error)
    }
}

export const errorPage = async (req, res) => {
    try {
        let erroMesage = req.session.messages ? req.session.messages[0] : ''
        res.render('main', { layout: 'error', error: erroMesage })
        req.session.messages = [];
    } catch (error) {
        logger.error(error)
    }
}