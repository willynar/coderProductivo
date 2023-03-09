import * as productosService from '../services/productos.service.js'
import { logger } from '../config/logger.js'


export const InicializarProductos = async () => {
    try {
        await productosService.InicializarProductos()
    } catch (error) {
        logger.error(error)
        res.json({ message: `Hubo un error: ${error}` })
    }
}



export const getAll = async (req, res) => {
    try {
        const response = await productosService.getAll();
        res.status(200).json(response)
    } catch (error) {
        logger.error(error)
        res.json({ message: `Hubo un error: ${error}` })
    }
}

export const getById = async (req, res) => {
    try {
        const response = await productosService.getById(parseInt(req.params.id));
        res.status(200).json(response)
    } catch (error) {
        logger.error(error)
        res.json({ message: `Hubo un error: ${error}` })
    }
}

export const save = async (req, res) => {
    try {
        const response = await productosService.save(req.body);
        res.status(200).json(response)
    } catch (error) {
        logger.error(error)
        res.json({ message: `Hubo un error: ${error}` })
    }
}

export const updateById = async (req, res) => {
    try {
        const response = await productosService.updateById(req.body);
        res.status(200).json(response)
    } catch (error) {
        logger.error(error)
        res.json({ message: `Hubo un error: ${error}` })
    }
}

export const deleteById = async (req, res) => {
    try {
        const response = await productosService.deleteById(parseInt(req.params.id));
        res.status(200).json(response)
    } catch (error) {
        logger.error(error)
        res.json({ message: `Hubo un error: ${error}` })
    }
}

