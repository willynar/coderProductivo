import { options } from "../config/app.Config.js";
import mongoose from "mongoose";
import productosModel from "./models/productos.model.js";
import carritosModel from "./models/carritos.model.js";
import loginModel from "./models/login.model.js";
import chatModel from "../dbOperations/models/chat.model.js";

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
        const { chatDaoArchivos } = await import("./daos/chat/chatDao.js");
        const { loginDaoArchivos } = await import("./daos/login/loginDao.js");
        // const { carritosDaoArchivos } = await import("./daos/carritos/carritosDao.js");
        ContenedorDaoProductos = new productosDaoArchivos(options.fileSystem.pathProducts);
        ContenedorDaoChats = new chatDaoArchivos(options.fileSystem.pathLogins);
        ContenedorDaoLogins = new loginDaoArchivos(loginModel);
        // ContenedorDaoCarritos = new carritosDaoArchivos(options.fileSystem.pathCarts);
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
        const { chatDaoMongo } = await import("./daos/chat/chatDaoMongo.js");
        const { loginDaoMongo } = await import("./daos/login/loginDaoMongo.js");
        const { carritosDaoMongo } = await import("./daos/carritos/carritosDaoMongo.js");
        ContenedorDaoProductos = new productosDaoMongo(productosModel);
        ContenedorDaoCarritos = new carritosDaoMongo(carritosModel);
        ContenedorDaoChats = new chatDaoMongo(chatModel);
        ContenedorDaoLogins = new loginDaoMongo(loginModel);
        const { emailGmail } = await import("./daos/email/emailGmail.js");
        const { whatsappTwilio } = await import("./daos/whatsap/whatsappTwilioDao.js");
        ContenedorDaoEmails = new emailGmail(options.trasporterEmail);
        ContenedorDaoWhatsap = new whatsappTwilio(options.twilio);
        break;
}

export { ContenedorDaoProductos, ContenedorDaoCarritos, ContenedorDaoLogins, ContenedorDaoEmails, ContenedorDaoWhatsap, ContenedorDaoChats }