import { ContenedorEmail } from "../../managers/gmailManagerEmail.js";
//crear una subclases de carritos  que trabaje con el contendor Archivos
class emailGmail extends ContenedorEmail{
    constructor(){
        //ejecutamos el contructor de clase ContenedorArchivo
        super();
    }
}

export {emailGmail}