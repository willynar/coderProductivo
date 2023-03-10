import { normalize, schema } from "normalizr";

import {ContenedorDaoChats} from "../index.js";
const chatApi = ContenedorDaoChats;

class socketsApp {
    constructor(socket, io) {
        this.io = io
        this.socket = socket
        this.authorSchema = new schema.Entity("authors", {}, { idAttribute: "email" })
        this.messageSchema = new schema.Entity("messages", { author: this.authorSchema }, {})
        this.chatSchema = new schema.Entity("chat", { messages: [this.messageSchema] }, { idAttribute: "id" })
    }

    normalizarData(data) {
        const normalizeData = normalize({ id: "chatHistory", messages: data }, this.chatSchema)
        return normalizeData
    }

    async normalizarMensajes() {
        const results = await chatApi.getAll()
        return this.normalizarData(results)
    }



    async getSocketChats() {
        let mensajes = {}
        mensajes.data = await this.normalizarMensajes()
        this.socket.emit('chat', mensajes)
        this.socket.on('chat', async data => {
            mensajes.push({ socketid: this.socket.id, data: await this.normalizarMensajes() })
            this.io.sockets.emit('chat', mensajes)
        })
    }
    async postSocketChats() {
        this.socket.on(`nuevosChats`, async data => {
            let post = await chatApi.save(data)
            let mensajes = {}
            mensajes.data = await this.normalizarMensajes()
            this.io.sockets.emit('chat', mensajes)
        })
    }


}
let Inicializar = async (socket, io) => {
    const sc = new socketsApp(socket, io)
    await sc.getSocketChats()
    await sc.postSocketChats()
}

export default { Inicializar }