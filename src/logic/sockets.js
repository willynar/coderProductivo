import http from 'http'
import request from 'request'

class socketsApp {
    constructor(socket, io) {
        this.io = io
        this.socket = socket
    }
    async getProductos() {
        let http_promise = this.getPromiseProduct()
        let mensajes = {}
        mensajes.data = await http_promise
        this.socket.emit('productos', mensajes)
        this.socket.on('productos', async data => {
            mensajes.push({ socketid: this.socket.id, data: await http_promise })
            this.io.sockets.emit('productos', mensajes)
        })
    }

    mensajesChat() {
        let mensajes = []
        mensajes.push("hola mundo")
        this.socket.emit('mensajes', mensajes)
        this.socket.on('mensajes', data => {
            mensajes.push({ socketid: this.socket.id, mensaje: data })
            this.io.sockets.emit('mensajes', mensajes)
        })
    }

    async postProductos() {
        this.socket.on(`nuevosProductos`, async data => {
            let http_promisePost = this.postPromiseProduct(data)
            console.log(await http_promisePost)
            let http_promise = this.getPromiseProduct()
            let mensajes = {}
            mensajes.data = await http_promise
            this.io.sockets.emit('productos', mensajes)
        })
    }

    postPromiseProduct(data) {
        return new Promise((resolve, reject) => {
            const options = {
                url: 'http://localhost:8080/api/productos',
                json: true,
                body: data
            };
            request.post(options, (err, res, body) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(body);
                }
            });
        });
    }

    getPromiseProduct() {
        return new Promise((resolve, reject) => {
            http.get('http://localhost:8080/api/productos', (response) => {
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
}
let Inicializar = async (socket, io) => {
    const sc = new socketsApp(socket, io)
    sc.mensajesChat()
    await sc.getProductos()
    await sc.postProductos()
}

export default { Inicializar }