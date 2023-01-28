import express from 'express'
const router = express.Router()

import { ContenedorDaoLogins } from "../daos/index.js";
const LoginApi = ContenedorDaoLogins;
import passport from "passport";

let InicializarLogin = async () => {
    // await LoginApi.save({ user: "wnaranjoa@mail.com", pasword: "123456789" })
}

// const myLogger = function (req, res, next) {
//     if (req.session.passport !== undefined) {
//     if (req.session.idUser) {
//         next()
//     } else {
//         res.redirect("/login-user")
//     }
// }

router.get('/:id', async (req, res) => {
    res.status(200).json(await LoginApi.getById(parseInt(req.params.id)))
})

router.post('/', passport.authenticate("signupStrategy", {
    failureRedirect: "/login-user",
    failureMessage: true
}), async (req, res) => {
    let result = await LoginApi.getLogin(req.body)
    // if (result != null) {
    //     req.session.user = req.body.user;
    //     req.session.idUser = result;
    // }
    res.status(200).json(result)
    // res.redirect("/home")
})



export default { router, InicializarLogin };