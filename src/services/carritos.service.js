import { logger } from '../config/logger.js';
import { ContenedorDaoCarritos, ContenedorDaoLogins, ContenedorDaoEmails, ContenedorDaoWhatsap } from "../dbOperations/index.js";


const carritosApi = ContenedorDaoCarritos;
const userApi = ContenedorDaoLogins;
const correoApi = ContenedorDaoEmails;
const whatsappApi = ContenedorDaoWhatsap;

export const getAll = async () => {
    return await productosApi.getAll();
}

export const getByIdProductos = async (id) => {
    return await carritosApi.getByIdProductos(id);
}

export const save = async (body) => {
    return await carritosApi.save(body);
}

export const saveProductos = async (id, body) => {
    return await carritosApi.saveProductos({ id: id, producto: body })
}

export const deleteByIdProducto = async (id, id_prod) => {
    return await carritosApi.deleteByIdProducto(id, id_prod);
}

export const deleteById = async (id) => {
    return await carritosApi.deleteById(id);
}


export const comprar = async (id, id_user) => {
    try {
        let carrito = await carritosApi.getByIdProductos(id);
        let usuario = await userApi.getAllById(id_user);

        correoApi.enviarCorreoCompraCarrito(carrito, usuario);
        whatsappApi.enviarWhatsappCompra(carrito, usuario);
        return { descripcion: `!Pedido: ${id}. realizado¡` }
    } catch (error) {
        logger.error(error);
        throw new Error(`Ocurrio un error: ${error}`);
    }
}