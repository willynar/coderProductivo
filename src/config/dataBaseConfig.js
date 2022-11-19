import path from "path";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const options = {
    fileSystem: {
        pathProducts: 'productos',
        pathCarts: 'carritos',
    },
    firebase:{
        serviceKey:{},
        databaseUrl:""
    },
    mariaDB: {
        //con que gestor de base de datos me voy a conectar
        client: "mysql",
        //toda la informacion de la base de datos para conectarnos
        connection: {
            host: "127.0.0.1",
            user: "root",
            password: "",
            database: "dbpruebas"
        }
    },
    sqliteDB: {
        //con que gestor de base de datos me voy a conectar
        client: "sqlite",
        //toda la informacion de la base de datos para conectarnos
        connection: {
            filename:path.join(__dirname , "../DB/ecommerce.sqlite")
        },
        useNullAsDefault: true
    },
    MongoDB:{
        Url:"mongodb+srv://wnaranjoa:891012breakW*@cluster0.z3vy9ot.mongodb.net/?retryWrites=true&w=majority",
        options:{
            useNewUrlParser:true,
            useUnifiedTopology:true
        }
    }
}