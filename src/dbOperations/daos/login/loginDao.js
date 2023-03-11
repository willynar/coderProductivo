import { ContenedorLogin } from "../../managers/fileManagerLogin.js";

//crear una subclases de carritos  que trabaje con el contendor Archivos
class loginDaoArchivos extends ContenedorLogin{
    constructor(filename){
        //ejecutamos el contructor de clase ContenedorArchivo
        super(filename);
    }
}

export {loginDaoArchivos}