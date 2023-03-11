import express from 'express'
import * as logoutController from '../../controllers/logout.controller.js'

const router = express.Router()

router.get('/', logoutController.sessionDestroy)

export default { router };