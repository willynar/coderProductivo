import { options } from "../config/appConfig.js";
import mongoose from "mongoose";
import productosModel from "./models/productos.js";
import carritosModel from "./models/carritos.js";
import loginModel from "./models/login.js";
//identificador
let databaseType = "mongo";

let ContenedorDaoProductos;
let ContenedorDaoCarritos;
let ContenedorDaoLogins;
let ContenedorDaoEmails;
let ContenedorDaoWhatsap;


switch (databaseType) {
    case "archivos":
        const { productosDaoArchivos } = await import("./daos/productos/productosDao.js");
        const { carritosDaoArchivos } = await import("./daos/carritos/carritosDao.js");
        // const { loginDaoArchivos } = await import("./login/loginDao.js");
        ContenedorDaoProductos = new productosDaoArchivos(options.fileSystem.pathProducts);
        ContenedorDaoCarritos = new carritosDaoArchivos(options.fileSystem.pathCarts);
        // ContenedorDaoLogins = new loginDaoArchivos(options.fileSystem.pathLogin);

        break;
    case "sql":
        // const {ProductosDaoSQL} = await import("./products/productsSql.js");
        // const {CarritosDaoSQL} = await import("./carts/cartsSql.js");
        // ContenedorDaoProductos = new ProductosDaoSQL(options.sqliteDB, "productos");
        // ContenedorDaoCarritos = new CarritosDaoSQL(options.sqliteDB,"carritos");
        break;
    case "mongo":
        mongoose.connect(options.MongoDB.Url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, error => {
            if (error) throw new Error(`connection failed ${error}`);
            console.log("conexion exitosa")
        })
        const { productosDaoMongo } = await import("./daos/productos/productosDaoMongo.js");
        const { carritosDaoMongo } = await import("./daos/carritos/carritosDaoMongo.js");
        const { loginDaoMongo } = await import("./daos/login/loginDaoMongo.js");
        const { emailGmail } = await import("./daos/email/emailGmail.js");
        const { whatsappTwilio } = await import("./daos/whatsap/whatsappTwilio.js");
        ContenedorDaoProductos = new productosDaoMongo(productosModel);
        ContenedorDaoCarritos = new carritosDaoMongo(carritosModel);
        ContenedorDaoLogins = new loginDaoMongo(loginModel);
        ContenedorDaoEmails = new emailGmail(options.trasporterEmail);
        ContenedorDaoWhatsap = new whatsappTwilio(options.twilio);
        break;
}

export { ContenedorDaoProductos, ContenedorDaoCarritos, ContenedorDaoLogins, ContenedorDaoEmails, ContenedorDaoWhatsap }