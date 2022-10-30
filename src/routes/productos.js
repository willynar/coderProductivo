import express from 'express'
const router = express.Router()

import Contenedor from '../logic/contenedor.js'
const cont = new Contenedor('productos')


let InicializarProductos = async () => {
    await cont.save({ nombre: "Escuadra", precio: 251291.32, timestamp: Date.now, descripcion: "elemento de officina", codigo: "5666565", stock: true, foto: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Squadra_45.jpg", id: 0 })
    await cont.save({ nombre: "Calculadora", precio: 251291.32, timestamp: Date.now, descripcion: "elemento de officina", codigo: "5343545", stock: true, foto: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Casio_fx-85WA_20050529.jpg", id: 0 })
    await cont.save({ nombre: "Globo terraqueo", precio: 251291.32, timestamp: Date.now, descripcion: "elemento decorativo", codigo: "6564645646", stock: true, foto: "https://upload.wikimedia.org/wikipedia/commons/0/0d/GlobeSK.jpg", id: 0 })
}

const myLogger = function (req, res, next) {
    let admin = req.header('AdminMode') == 'true'
    if (admin) {
        next()
    }else{
        res.status(401).json({descripcion:`ruta no autorizada ${req.originalUrl}`})
    }
}

router.get('/', async (req, res) => {
    res.status(200).json(await cont.getAll())
})

router.get('/:id', async (req, res) => {
    res.status(200).json(await cont.getById(parseInt(req.params.id)))
})

router.post('/', myLogger, async (req, res) => {
    console.log(req.body)
    res.status(200).json(await cont.save(req.body))
})

router.put('/', myLogger, async (req, res) => {
    res.status(200).json(await cont.updateById(req.body))
})

router.delete('/:id', myLogger, async (req, res) => {
    res.status(200).json(await cont.deleteById(parseInt(req.params.id)))
})

export default { router, InicializarProductos };