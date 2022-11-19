import express from 'express';
import * as http from 'http';
import * as socketIo from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import productos from './routes/productos.js'
import carritos from './routes/carrito.js'
import vistasHandlebars from './routes/Views.js'
import socketsAPP from './containers/contenedorSockets.js'

const app = express()
const httpServer = new http.createServer(app)
const io = new socketIo.Server(httpServer)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import handlebars from 'express-handlebars'
const PORT = 8080




app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(async function (err, req, res, next) {
    console.log(err.stack)
    // res.status(500).send('Something broke!')
    // let urlArray = req.originalUrl.split('/')
    res.status(500).json({ error: error.status, descripcion: `ruta ${port}/${urlArray[0]} metodo ${req.originalUrl} no implementada` })
})

app.engine('hbs',
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: process.env.HBS_DEFAULT_LAYOUT,
        layoutsDir_dirname: './src/views/layouts',
        partialsDir_dirname: './src/views/partials'
    })
)



app.set('view engine', 'hbs')
app.set('views', './views')

app.use(express.static(__dirname + '/public'))

app.set('socketio', io);

httpServer.listen(PORT, async () => {
    console.log(`Servidor Http escuchando en el puerto ${httpServer.address().port}`)
    await productos.InicializarProductos()
})


io.on('connection', async (socket) => {
    await socketsAPP.Inicializar(socket, io)
})

httpServer.on('error', error => console.log(`Error en servidor ${error}`))

app.use('/api/productos', productos.router)
app.use('/api/carrito', carritos.router)
app.use('/', vistasHandlebars.router)
//rutas no implementadas
app.get('*', function (req, res) {
    res.status(404).send(JSON.stringify({ error: 404, descripcion: `ruta /${req.originalUrl} no implementada` }));
});
app.post('*', function (req, res) {
    res.status(404).send(JSON.stringify({ error: 404, descripcion: `ruta /${req.originalUrl} no implementada` }));
});
app.put('*', function (req, res) {
    res.status(404).send(JSON.stringify({ error: 404, descripcion: `ruta /${req.originalUrl} no implementada` }));
});
app.delete('*', function (req, res) {
    res.status(404).send(JSON.stringify({ error: 404, descripcion: `ruta /${req.originalUrl} no implementada` }));
});