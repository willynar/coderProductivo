import * as loginService from '../services/login.service.js'
import { logger } from '../config/logger.js'
import passport from "passport";

export const InicializarLogin = async () => {
    try {
        await loginService.InicializarLogin()
    } catch (error) {
        logger.error(error)
        res.json({ message: `Hubo un error: ${error}` })
    }
}

export const getById = async (req, res) => {
    try {
        const response = await loginService.getById(parseInt(req.params.id));
        res.status(200).json(response)
    } catch (error) {
        logger.error(error)
        res.json({ message: `Hubo un error: ${error}` })
    }
}

export const getLogin = async (req, res) => {
    try {
        // if (result != null) {
        //     req.session.user = req.body.user;
        //     req.session.idUser = result;
        // }
        const response = await loginService.getLogin(req.body);
        res.status(200).json(response)
        // res.redirect("/home")
    } catch (error) {
        logger.error(error)
        res.json({ message: `Hubo un error: ${error}` })
    }
}

export const authenticate = async ()=>{
    passport.authenticate("signupStrategy", {
        failureRedirect: "/login-user",
        failureMessage: true
    })
}