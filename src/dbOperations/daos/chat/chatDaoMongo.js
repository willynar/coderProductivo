import { ContenedorChatMongo } from "../../managers/mongoManagerChat.js";

//crear una subclases de carritos  que trabaje con el contendor Archivos
class chatDaoMongo extends ContenedorChatMongo{
    constructor(model){
        //ejecutamos el contructor de clase ContenedorArchivo
        super(model);
    }
}

export {chatDaoMongo}