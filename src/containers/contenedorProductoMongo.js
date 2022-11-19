class ContenedorProductoMongo {
    constructor(model) {
        this.model = model
    }

    async save(objet) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this.model.create(objet);
                resolve(result._id)
            } catch (err) {
                reject(err)
            }
        })
    }

    async getById(id) {
        const result = await this.model.findOne({ _id: id })
        return result
    }

    async getAll() {
        const result = await this.model.find();
        const products = result.map(elm => ({ nombre: elm.nombre, precio: elm.precio, descripcion: elm.descripvion, codigo: elm.codigo, stock: elm.stock, foto: elm.foto, id: elm._id }));
        return products
    }


    async updateById(objectUpd) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this.model.update({ _id: objectUpd.id }, { $set: { nombre: objectUpd.nombre, precio: objectUpd.precio, timestamp: objectUpd.timestamp, descripcion: objectUpd.descripcion, codigo: objectUpd.codigo, stock: objectUpd.stock, foto: objectUpd.foto } })
                resolve(result)
            } catch (err) {
                reject(err)
            }
        })
    }

    async deleteById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.model.deleteMany({ _id: id })
                resolve('objeto eliminado')
            } catch (err) {
                reject(err)
            }
        })
    }

    async deleteAll() {
        return new Promise(async (resolve, reject) => {
            try {
                await this.model.deleteMany({})
                resolve('objetos eliminados')
            } catch (err) {
                reject(err)
            }
        })
    }

}

export { ContenedorProductoMongo }