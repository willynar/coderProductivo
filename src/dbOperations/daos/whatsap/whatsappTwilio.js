import { ContenedorWhatsapp } from "../../managers/twilioManagerWhatsapp.js";
//crear una subclases de carritos  que trabaje con el contendor Archivos
class whatsappTwilio extends ContenedorWhatsapp{
    constructor(options){
        //ejecutamos el contructor de clase ContenedorArchivo
        super(options);
    }
}

export {whatsappTwilio}