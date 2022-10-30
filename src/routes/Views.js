import express from 'express'
import http from 'http'
const router = express.Router()

router.get('/', async (req, res) => {
    res.render('main', { layout: 'guardar' })
})

router.get('/cargados/', async (req, res) => {

    res.render('main', { layout: 'productos' })
})

router.get('/carritoView/', async (req, res) => {

    res.render('main', { layout: 'carrito' })
})

router.get('/actualizar/:id_pro', async (req, res) => {
    let http_promise = getPromiseProduct(parseInt(req.params.id_pro),)
    res.render('main', { layout: 'actualizar', data: await http_promise })
})

async function getPromiseProduct(id_pro) {
    return new Promise((resolve, reject) => {
        http.get(`http://localhost:8080/api/productos/${id_pro}`, (response) => {
            let chunks_of_data = [];
            response.on('data', (fragments) => {
                chunks_of_data.push(fragments);
            });
            response.on('end', () => {
                let response_body = Buffer.concat(chunks_of_data);
                resolve(JSON.parse(response_body));
            });
            response.on('error', (error) => {
                reject(error);
            });
        });
    });
    
}





export default { router };