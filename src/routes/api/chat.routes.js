import express from 'express'
import * as chatController from '../../controllers/chat.controller.js'

const router = express.Router()

router.get('/',chatController.getAll)

router.post('/', chatController.save)

export default { router };