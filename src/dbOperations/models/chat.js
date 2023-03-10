import mongoose from "mongoose";

//definir la collecion
const chatCollection = "chats";
// const autorSchema = new mongoose.Schema({
//     email: String,
//     nombre: String,
//     apellido: String,
//     edad: Number,
//     alias: String,
//     avatar: String
// })

//definir el esquema
const chatSchema = new mongoose.Schema({
    id: Number,
    author: Object,
    text: String,
    date: Date
})

//generamos el modelo
const chatModel = mongoose.model(chatCollection, chatSchema);
export default chatModel 