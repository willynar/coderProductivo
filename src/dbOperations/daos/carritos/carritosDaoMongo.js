import { ContenedorCarritoMongo } from "../../managers/mongoManagerCarrito.js";

//crear una subclases de carritos  que trabaje con el contendor Archivos
class carritosDaoMongo extends ContenedorCarritoMongo{
    constructor(model){
        //ejecutamos el contructor de clase ContenedorArchivo
        super(model);
    }
}

export {carritosDaoMongo}