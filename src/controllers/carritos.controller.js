import * as carritosService from '../services/carritos.service.js'
import { logger } from '../config/logger.js'

export const save = async (req, res) => {
    try {
        const response = await carritosService.save(req.body);
        res.status(200).json(response)
    } catch (error) {
        logger.error(error)
        res.json({ message: `Hubo un error: ${error}` })
    }
}

export const deleteById = async (req, res) => {
    try {
        const response = await carritosService.deleteById(req.params.id);
        res.status(200).json(response)
    } catch (error) {
        logger.error(error)
        res.json({ message: `Hubo un error: ${error}` })
    }
}

export const getByIdProductos = async (req, res) => {
    try {
        const response = await carritosService.getByIdProductos(req.params.id);
        res.status(200).json(response)
    } catch (error) {
        logger.error(error)
        res.json({ message: `Hubo un error: ${error}` })
    }
}

export const saveProductos = async (req, res) => {
    try {
        const response = await carritosService.saveProductos({ id: req.params.id, producto: req.body });
        res.status(200).json(response)
    } catch (error) {
        logger.error(error)
        res.json({ message: `Hubo un error: ${error}` })
    }
}

export const deleteByIdProducto = async (req, res) => {
    try {
        const response = await carritosService.deleteByIdProducto(req.params.id, req.params.id_prod);
        res.status(200).json(response)
    } catch (error) {
        logger.error(error)
        res.json({ message: `Hubo un error: ${error}` })
    }
}

export const comprar = async (req, res) => {
    try {
        const response = await carritosService.comprar(req.params.id, req.params.id_user);
        res.status(200).json(response)
    } catch (error) {
        logger.error(error)
        res.json({ message: `Hubo un error: ${error}` })
    }
}