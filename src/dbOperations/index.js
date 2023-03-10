import { options } from "../config/appConfig.js";
import mongoose from "mongoose";
import productosModel from "./models/productos.js";
import carritosModel from "./models/carritos.js";
import loginModel from "./models/login.js";
import chatModel from "../dbOperations/models/chat.js";

//identificador
let databaseType = "mongo";

let ContenedorDaoProductos;
let ContenedorDaoCarritos;
let ContenedorDaoLogins;
let ContenedorDaoEmails;
let ContenedorDaoWhatsap;
let ContenedorDaoChats;


switch (databaseType) {
    case "archivos":
        const { productosDaoArchivos } = await import("./daos/productos/productosDao.js");
        const { carritosDaoArchivos } = await import("./daos/carritos/carritosDao.js");
        const { chatDaoArchivos } = await import("./daos/chat/chatDao.js");
        ContenedorDaoProductos = new productosDaoArchivos(options.fileSystem.pathProducts);
        ContenedorDaoCarritos = new carritosDaoArchivos(options.fileSystem.pathCarts);
        ContenedorDaoChats = new chatDaoArchivos(options.fileSystem.pathChats);
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
        const { whatsappTwilio } = await import("./daos/whatsap/whatsappTwilioDao.js");
        const { chatDaoMongo } = await import("./daos/chat/chatDaoMongo.js");
        ContenedorDaoProductos = new productosDaoMongo(productosModel);
        ContenedorDaoCarritos = new carritosDaoMongo(carritosModel);
        ContenedorDaoLogins = new loginDaoMongo(loginModel);
        ContenedorDaoEmails = new emailGmail(options.trasporterEmail);
        ContenedorDaoWhatsap = new whatsappTwilio(options.twilio);
        ContenedorDaoChats = new chatDaoMongo(chatModel);
        break;
}

export { ContenedorDaoProductos, ContenedorDaoCarritos, ContenedorDaoLogins, ContenedorDaoEmails, ContenedorDaoWhatsap,ContenedorDaoChats }