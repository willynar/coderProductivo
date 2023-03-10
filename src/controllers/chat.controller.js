import * as chatService from '../services/chat.service.js'
import { logger } from '../config/logger.js'

export const InicializarChat = async () => {
    try {
        await chatService.InicializarChat()
    } catch (error) {
        logger.error(error)
        res.json({ message: `Hubo un error: ${error}` })
    }
}

export const getAll = async (req, res) => {
    try {
        const response = await chatService.getAll();
        res.status(200).json(response)
    } catch (error) {
        logger.error(error)
        res.json({ message: `Hubo un error: ${error}` })
    }
}

export const save = async (req, res) => {
    try {
        const response = await chatService.save(req.body);
        res.status(200).json(response)
    } catch (error) {
        logger.error(error)
        res.json({ message: `Hubo un error: ${error}` })
    }
}