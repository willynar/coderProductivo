import express from 'express'
const router = express.Router()
import * as loginController from '../../controllers/login.controller.js'
import passport from "passport";

router.get('/:id', loginController.getById)

router.post('/', passport.authenticate("signupStrategy", {
    failureRedirect: "/login-user",
    failureMessage: true
}),loginController.getLogin)



export default { router, loginController };