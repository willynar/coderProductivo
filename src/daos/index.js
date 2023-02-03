import { options } from "../config/appConfig.js";
import mongoose from "mongoose";
import productosModel from "../config/models/productos.js";
import carritosModel from "../config/models/carritos.js";
import loginModel from "../config/models/login.js";
//identificador
let databaseType = "mongo";

let ContenedorDaoProductos;
let ContenedorDaoCarritos;
let ContenedorDaoLogins;
let ContenedorDaoEmails;
let ContenedorDaoWhatsap;


switch (databaseType) {
    case "archivos":
        const { productosDaoArchivos } = await import("./productos/productosDao.js");
        const { carritosDaoArchivos } = await import("./carritos/carritosDao.js");
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
        const { productosDaoMongo } = await import("./productos/productosDaoMongo.js");
        const { carritosDaoMongo } = await import("./carritos/carritosDaoMongo.js");
        const { loginDaoMongo } = await import("./login/loginDaoMongo.js");
        const { emailGmail } = await import("./email/emailGmail.js");
        const { whatsappTwilio } = await import("./whatsap/whatsappTwilio.js");
        ContenedorDaoProductos = new productosDaoMongo(productosModel);
        ContenedorDaoCarritos = new carritosDaoMongo(carritosModel);
        ContenedorDaoLogins = new loginDaoMongo(loginModel);
        ContenedorDaoEmails = new emailGmail(options.trasporterEmail);
        ContenedorDaoWhatsap = new whatsappTwilio(options.twilio);
        break;
}

export { ContenedorDaoProductos, ContenedorDaoCarritos, ContenedorDaoLogins, ContenedorDaoEmails, ContenedorDaoWhatsap }