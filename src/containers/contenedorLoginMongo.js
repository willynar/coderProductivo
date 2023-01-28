class ContenedorLoginMongo {
    constructor(model) {
        this.model = model
    }

    async save(objet) {
        return new Promise(async (resolve, reject) => {
            try {
                const resultuser = await this.model.findOne({ user: objet.username })
                if (resultuser) {
                    let mensaje = "!ya existe el usuario¡";
                    resolve(mensaje)
                } else {
                    let result = await this.model.create(objet);
                    resolve(result._id)
                }
            } catch (err) {
                reject(err)
            }
        })
    }

    async getLogin(object) {
        const result = await this.model.findOne({ username: object.username, password: object.password })
        if (result) {
            return result
        } else {
            return null
        }
    }

    async getById(id) {
        const result = await this.model.findOne({ _id: id })
        return result.username
    }
}

export { ContenedorLoginMongo }