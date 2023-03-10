import { ContenedorDaoChats } from "../dbOperations/index.js";
const chatApi = ContenedorDaoChats;

export const InicializarChat = async () => {
    await chatApi.save({ id: 0, author: { email: "willynargame@gmail.com", nombre: "willy", apellido: "naranjo", edad: 21, alias: "Willynar", avatar: "https://www.pngmart.com/files/12/Boy-Emoji-Avatar-PNG.png" }, text: "hola", date: "2022-11-25T16:32:35.768Z" })
    await chatApi.save({ id: 0, author: { email: "juanita@gmail.com", nombre: "juanita", apellido: "ardila", edad: 21, alias: "juanita", avatar: "https://www.pngmart.com/files/12/Cute-Hair-Girl-Emoji-PNG-Pic.png" }, text: "hola", date: "2022-11-25T16:33:35.768Z" })
}

export const getAll = async () => {
       return await chatApi.getAll();
}

export const save = async (body) => {
    return await chatApi.save(body);
}