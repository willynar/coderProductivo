import { ContenedorDaoLogins } from "../dbOperations/index.js";
const LoginApi = ContenedorDaoLogins;

export const InicializarLogin = async () => {
    await LoginApi.save({ user: "wnaranjoa@mail.com", pasword: "123456789" })
}

export const getById = async (id) => {
    return await LoginApi.getById(parseInt(id));
}

export const getLogin = async (body) => {
    return await LoginApi.getLogin(body);
}