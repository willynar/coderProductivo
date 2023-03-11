import express from 'express';
import * as http from 'http';
import * as socketIo from 'socket.io';
import path from 'path';
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import mongoose from "mongoose"
import bcrypt from "bcrypt";
import cluster from 'cluster'
import compression from 'compression'
import handlebars from 'express-handlebars'


import loginModel from "./src/dbOperations/models/login.model.js"
import { options } from "./src/config/app.Config.js";
import { logger } from './src/config/logger.js'
import {ContenedorDaoEmails} from "./src/dbOperations/index.js";
import carritos from './src/routes/api/carrito.routes.js'
import login from './src/routes/api/login.routes.js'
import logout from './src/routes/api/logout.routes.js'
import vistasHandlebars from './src/routes/view.routes.js'
import socketsAPP from './src/dbOperations/managers/socketsManagerProducto.js'
import productos from './src/routes/api/productos.routes.js'
import chats from './src/routes/api/chat.routes.js'
import socketsAPPChat from './src/dbOperations/managers/socketsManagerChat.js'


const emailApi = ContenedorDaoEmails;

//se impre mensaje inicial comunicando el puerto y el modo de inicio
logger.warn('modo', options.objArguments.mode, 'PORT', options.objArguments.port)

const app = express()
const httpServer = new http.createServer(app)
const io = new socketIo.Server(httpServer)
app.set('socketio', io);

// para  nginx y local
// const __filename = fileURLToPath(import.meta.url);
// para babel 
const __filename = process.argv[1];
const __dirname = path.dirname(__filename);

//se inicializa la coneccion con mongo
mongoose.connect(options.MongoDB.Url, options.MongoDB.options, error => {
    if (error) throw new Error(`connection failed ${error}`);
    logger.info("conexion exitosa")
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(async function (err, req, res, next) {
    logger.error(err.stack)
    res.status(500).json({ error: error.status, descripcion: `ruta ${options.objArguments.port}/${urlArray[0]} metodo ${req.originalUrl} no implementada` })
})

//se inicializa la configuracion con hadlebars
app.engine('hbs',
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: process.env.HBS_DEFAULT_LAYOUT,
        layoutsDir_dirname: '/views/layouts',
        partialsDir_dirname: '/views/partials'
    })
)

app.set('view engine', 'hbs')
app.set('views', `${__dirname}/views`);

//se inicializa la persistencia de archivos publicos
app.use(express.static(__dirname + '/public'))

//se verifica el modo de inicio  cluser  o Fork y se inica el server
if (options.objArguments.mode === 'CLUSTER' && cluster.isPrimary) {
    for (let index = 0; index < options.infoApp.procesors; index++) {
        cluster.fork();
    }
    cluster.on('exit', (worker) => {
        logger.error(`el subproceso ${worker.process.pid} fallo`)
    })
} else {
    httpServer.listen(options.objArguments.port, async () => {
        logger.trace(`Servidor Http escuchando en el puerto ${httpServer.address().port} on process ${process.pid}`)
        await login.loginController.InicializarLogin()
    })

    httpServer.on('error', error => logger.error(`Error en servidor ${error}`))

    io.on('connection', async (socket) => {
        await socketsAPP.Inicializar(socket, io)
        await socketsAPPChat.Inicializar(socket, io)
    })
}

app.use(cookieParser());

//se inicializa la coneccion mongo para las seesiones
app.use(session({
    store: MongoStore.create({
        mongoUrl: options.MongoDB.UrlSession
    }),
    secret: "llavesecreta",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 },
}))

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    loginModel.findById(id, (err, userFound) => {
        if (err) return done(err)
        return done(null, userFound)
    })
})

const createHash = (password) => {
    const hash = bcrypt.hashSync(password, bcrypt.genSalt(10));
    return hash;
}

//se inicializa la estrategia  de login y  registro
passport.use("signupStrategy",
    new LocalStrategy(
        { passReqToCallback: true, usernameField: "username" },
        (req, username, password, done) => {
            //logica para registrar al usuaurio
            //verificar si el usuario exitse en db
            loginModel.findOne({ username: username }, (error, userFound) => {
                if (error) return done(error, null, { message: "Hubo un error" });
                if (userFound) return done(null, userFound, { message: "El usuario ya existe" });
                //guardamos el usuario en la db

                const newUser = {
                    name: req.body.name,
                    username: username,
                    password: password,
                    adress: req.body.adress,
                    age: req.body.age,
                    address: req.body.address,
                    phone: req.body.phone,
                    url: req.body.url
                };
                loginModel.create(newUser, async (error, userCreated) => {
                    if (error) {
                        return done(error, null, { message: "Hubo un error al registrar el usuario" })
                    } else {
                        //aqui el correo
                       await emailApi.enviarCorreoRegistro(newUser);
                    }
                    return done(null, userCreated);
                })
            })
        }));

app.post("/singup", passport.authenticate("signupStrategy", {
    failureRedirect: "/erroPage",
    failureMessage: true
}), (req, res) => {
    res.redirect("/home")
})

//se inicializa midleware para inprimir todas las urs  alas que se acceda
const logUrlsInfo = function (req, res, next) {
    logger.info(`ruta /${req.originalUrl} . Metodo /${req.method}`)
    next()
}

app.use(compression())

//se inicializan los diferentes end points api
app.use('/api/chat', logUrlsInfo, chats.router)
app.use('/api/productos', logUrlsInfo, productos.router)
app.use('/api/carrito', logUrlsInfo, carritos.router)
app.use('/api/login', logUrlsInfo, login.router)
app.use('/api/logout', logUrlsInfo, logout.router)
app.use('/', logUrlsInfo, vistasHandlebars.router)

//se capturan rutas no implementadas
app.get('*', function (req, res) {
    logger.warn(`ruta /${req.originalUrl} no implementada. Metodo /${req.method}`)
    res.status(404).send(JSON.stringify({ error: 404, descripcion: `ruta /${req.originalUrl} no implementada. Metodo /${req.method}` }));
});
app.post('*', function (req, res) {
    logger.warn(`ruta /${req.originalUrl} no implementada. Metodo /${req.method}`)
    res.status(404).send(JSON.stringify({ error: 404, descripcion: `ruta /${req.originalUrl} no implementada. Metodo /${req.method}` }));
});
app.put('*', function (req, res) {
    logger.warn(`ruta /${req.originalUrl} no implementada. Metodo /${req.method}`)
    res.status(404).send(JSON.stringify({ error: 404, descripcion: `ruta /${req.originalUrl} no implementada. Metodo /${req.method}` }));
});
app.delete('*', function (req, res) {
    logger.warn(`ruta /${req.originalUrl} no implementada. Metodo /${req.method}`)
    res.status(404).send(JSON.stringify({ error: 404, descripcion: `ruta /${req.originalUrl} no implementada. Metodo /${req.method}` }));
});