import { ContenedorLoginMongo } from "../../containers/contenedorLoginMongo.js";

//crear una subclases de carritos  que trabaje con el contendor Archivos
class loginDaoMongo extends ContenedorLoginMongo{
    constructor(model){
        //ejecutamos el contructor de clase ContenedorArchivo
        super(model);
    }
}

export {loginDaoMongo}