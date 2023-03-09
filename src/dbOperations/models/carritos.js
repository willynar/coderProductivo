import mongoose from "mongoose";

//definir la collecion
const carritosCollection = "carritos";

//definir el esquema
const carritoSchema = new mongoose.Schema({
    carrito:[Object]
})

//generamos el modelo
const carritosModel = mongoose.model(carritosCollection, carritoSchema);
export default carritosModel 