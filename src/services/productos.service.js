import { ContenedorDaoProductos } from "../dbOperations/index.js";
const productosApi = ContenedorDaoProductos;

//la siguiente fucnion es para generar productos en caso de no tenerlos
// let InicializarProductos = async () => {
//     await productosApi.save({ nombre: "Escuadra", precio: 251291.32, timestamp: Date.now, descripcion: "elemento de officina", codigo: "5666565", stock: true, foto: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Squadra_45.jpg"})
//     await productosApi.save({ nombre: "Calculadora", precio: 251291.32, timestamp: Date.now, descripcion: "elemento de officina", codigo: "5343545", stock: true, foto: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Casio_fx-85WA_20050529.jpg"})
//     await productosApi.save({ nombre: "Globo terraqueo", precio: 251291.32, timestamp: Date.now, descripcion: "elemento decorativo", codigo: "6564645646", stock: true, foto: "https://upload.wikimedia.org/wikipedia/commons/0/0d/GlobeSK.jpg" })
// }

export const getAll = async () => {
    return await productosApi.getAll();
}

export const getById = async (id) => {
    return await productosApi.getById(id);
}

export const save = async (body) => {
    return await productosApi.save(body);
}

export const updateById = async (body) => {
    return await productosApi.updateById(body);
}

export const deleteById = async (id) => {
    return await productosApi.deleteById(id);
}

