import { ContenedorProductoMongo } from "../../managers/mongoManagerProducto.js";

//crear una subclases de carritos  que trabaje con el contendor Archivos
class productosDaoMongo extends ContenedorProductoMongo{
    constructor(model){
        //ejecutamos el contructor de clase ContenedorArchivo
        super(model);
    }
}

export {productosDaoMongo}