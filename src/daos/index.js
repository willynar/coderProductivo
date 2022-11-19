import { options } from "../config/dataBaseConfig.js";
import mongoose from "mongoose";
import productosModel from "../config/models/productos.js";
import carritosModel from "../config/models/carritos.js";

//identificador
let databaseType = "mongo";

let ContenedorDaoProductos;
let ContenedorDaoCarritos;



switch (databaseType) {
    case "archivos":
        const { productosDaoArchivos } = await import("./productos/productosDao.js");
        const { carritosDaoArchivos } = await import("./carritos/carritosDao.js");
        ContenedorDaoProductos = new productosDaoArchivos(options.fileSystem.pathProducts);
        ContenedorDaoCarritos = new carritosDaoArchivos(options.fileSystem.pathCarts);
        break;
    case "sql":
        // const {ProductosDaoSQL} = await import("./products/productsSql.js");
        // const {CarritosDaoSQL} = await import("./carts/cartsSql.js");
        // ContenedorDaoProductos = new ProductosDaoSQL(options.sqliteDB, "productos");
        // ContenedorDaoCarritos = new CarritosDaoSQL(options.sqliteDB,"carritos");
        break;
    case "mongo":
        mongoose.connect(options.MongoDB.Url,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        }, error=>{
            if(error) throw new Error(`connection failed ${error}`);
            console.log("conexion exitosa")
        })
        const {productosDaoMongo} = await import("./productos/productosDaoMongo.js");
        const {carritosDaoMongo} = await import("./carritos/carritosDaoMongo.js");
        ContenedorDaoProductos = new productosDaoMongo(productosModel);
        ContenedorDaoCarritos = new carritosDaoMongo(carritosModel);
        break;
}

export { ContenedorDaoProductos, ContenedorDaoCarritos }