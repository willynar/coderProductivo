class ContenedorChatMongo {
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

    async getAll() {
        const result = await this.model.find();
        const products = result.map(elm => ({ author: elm.author, text: elm.text, date: elm.date, id: elm._id }));
        return products
    }
}

export { ContenedorChatMongo }