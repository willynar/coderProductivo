class ContenedorCarritoMongo {
    constructor(model) {
        this.model = model
    }

    async save(objet) {
        return new Promise(async (resolve, reject) => {
            try {
                let objetoNuevo = { carrito: [] };
                let result = await this.model.create(objetoNuevo);
                resolve(result._id)
            } catch (err) {
                reject(err)
            }
        })
    }

    async getById(id) {
        const result = await this.model.find({ _id: id })
        //se valida si el objeto si existe
        if (result[0] === undefined) {
            return { error: 'carrito no encontrado' }
            // return null
        } else {
            return products[0]
        }
    }

    async getByIdProductos(id) {
        const result = await this.model.find({ _id: id })
        //se valida si el objeto si existe
        if (result[0] === undefined) {
            return { error: 'carrito no encontrado' }
            // return null
        } else {
            return result[0].carrito
        }
    }

    async saveProductos(objectUpd) {
        return new Promise(async (resolve, reject) => {
            const result = await this.model.findOne({ _id: objectUpd.id })
            if (result != null) {
                try {
                    let resultt = await this.model.update({ _id: objectUpd.id }, { $push: { carrito: objectUpd.producto } });
                    resolve(resultt)

                } catch (err) {
                    reject(err)
                }
            } else {
                resolve(null)
            }
        })
    }

    async getAll() {
        const result = await this.model.find();
        return result
    }

    async deleteById(id) {
        console.log(id)
        return new Promise(async (resolve, reject) => {
            try {
                await this.model.deleteMany({ _id: id })
                resolve('objeto eliminado')
            } catch (err) {
                reject(err)
            }
        })
    }

    async deleteByIdProducto(id, id_prod) {
        return new Promise(async (resolve, reject) => {
            const result = await this.model.findOne({ _id: id })
            if (result != null) {
                try {
                    let resultt = await this.model.update({ _id: id },{$pull: {carrito: {_id: id_prod}}});
                    resolve(resultt)

                } catch (err) {
                    reject(err)
                }
            } else {
                resolve(null)
            }
        })
    }

}

export { ContenedorCarritoMongo }