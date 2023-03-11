import fs from 'fs';
class ContenedorLogin {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo
        this.extencion = '.txt'
        if (!fs.existsSync(`./src/persistance/${this.nombreArchivo}${this.extencion}`)) {
            fs.createWriteStream(`./src/persistance/${this.nombreArchivo}${this.extencion}`, 'utf-8')
        }
    }

    async save(objet) {
        if (fs.existsSync(`./src/persistance/${this.nombreArchivo}${this.extencion}`)) {
            let array = []
            await fs.promises.readFile(`./src/persistance/${this.nombreArchivo}${this.extencion}`, 'utf-8')
                .then(async result => {
                    let ultimoId = 0;
                    //se valida si tiene contenido el archivo y convierte contenido a json array
                    if (result) {
                        array = JSON.parse(result)
                        array.forEach(element => {
                            ultimoId = element.id;
                        })
                    } else {
                        array = []
                    }
                    objet.id = ++ultimoId;
                    array.push(objet)
                    try {
                        await fs.promises.writeFile(`./src/persistance/${this.nombreArchivo}${this.extencion}`, JSON.stringify(array))
                    } catch (err) {
                        reject(err)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            return objet.id
        } else {
            return 'No existe el archivo'
        }
    }

    async getLogin(object) {
        let objet
        await fs.promises.readFile(`${this.rutaCompleta}`, 'utf-8')
            .then(result => {
                if (result) {
                    let array = JSON.parse(result)
                    array.forEach(x => {
                        if (x.username == object.username && x.password == object.password) {
                            objet = x
                        }
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
        //se valida si el objeto si existe
        if (objet === undefined) {
            return null
            // return null
        } else {
            return objet
        }
    }

    async getById(id) {
        let objet
        await fs.promises.readFile(`${this.rutaCompleta}`, 'utf-8')
            .then(result => {
                if (result) {
                    let array = JSON.parse(result)
                    array.forEach(x => {
                        if (x.id == parseInt(id)) {
                            objet = x
                        }
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
        //se valida si el objeto si existe
        if (objet === undefined) {
            return { error: 'id no encontrado' }
            // return null
        } else {
            return objet.username
        }
    }

    async getAllById(id) {
        let objet
        await fs.promises.readFile(`${this.rutaCompleta}`, 'utf-8')
            .then(result => {
                if (result) {
                    let array = JSON.parse(result)
                    array.forEach(x => {
                        if (x.id == parseInt(id)) {
                            objet = x
                        }
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
        //se valida si el objeto si existe
        if (objet === undefined) {
            return { error: 'id no encontrado' }
            // return null
        } else {
            return objet
        }
    }
}

export { ContenedorLogin }