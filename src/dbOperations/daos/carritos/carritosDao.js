import { ContenedorCarrito } from "../../managers/fileManagerCarrito.js";

//crear una subclases de carritos  que trabaje con el contendor Archivos
class carritosDaoArchivos extends ContenedorCarrito{
    constructor(filename){
        //ejecutamos el contructor de clase ContenedorArchivo
        super(filename);
    }
}

export {carritosDaoArchivos}