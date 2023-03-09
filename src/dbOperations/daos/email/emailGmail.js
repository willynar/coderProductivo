import { ContenedorEmail } from "../../managers/gmailManagerEmail.js";
//crear una subclases de carritos  que trabaje con el contendor Archivos
class emailGmail extends ContenedorEmail{
    constructor(trasporterEmail){
        //ejecutamos el contructor de clase ContenedorArchivo
        super(trasporterEmail);
    }
}

export {emailGmail}