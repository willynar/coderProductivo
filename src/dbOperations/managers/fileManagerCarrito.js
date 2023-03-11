import fs from 'fs';
class ContenedorCarrito {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo
        this.extencion = '.txt'
        if (!fs.existsSync(`./src/persistance/${this.nombreArchivo}${this.extencion}`)) {
            fs.createWriteStream(`./src/persistance/${this.nombreArchivo}${this.extencion}`, 'utf-8')
        }
    }

    async save(objet) {
        console.log(`${this.rutaCompleta}`)
        if (fs.existsSync(`${this.rutaCompleta}`)) {
            let array = []
            await fs.promises.readFile(`${this.rutaCompleta}`, 'utf-8')
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
                    objet.carrito = [];
                    array.push(objet)
                    try {
                        await fs.promises.writeFile(`${this.rutaCompleta}`, JSON.stringify(array))
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
            return { error: 'carrito no encontrado' }
            // return null
        } else {
            return objet
        }
    }

    async getByIdProductos(id) {
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
            return { error: 'carrito no encontrado' }
            // return null
        } else {
            return objet.carrito
        }
    }

    async saveProductos(objectUpd) {
        let objet
        return new Promise(async (resolve, reject) => {
            let array = await this.getAll()
            let objeto = array.find(x => x.id === parseInt(objectUpd.id))
            //se valida que el ojeto exista
            const index = array.indexOf(objeto);
            if (index > -1) {
                array[index].carrito.push(objectUpd.producto)
                objet = array[index]
                try {
                    await fs.promises.writeFile(`${this.rutaCompleta}`, JSON.stringify(array))
                    resolve(objet)

                } catch (err) {
                    reject(err)
                }
            } else {
                resolve(null)
            }
        })
    }

    async getAll() {
        let array = []
        await fs.promises.readFile(`${this.rutaCompleta}`, 'utf-8')
            .then(async result => {
                //se valida que ayan datos
                if (result) {
                    array = JSON.parse(result)
                }
            })
            .catch(err => {
                console.log(err)
            })

        return array
    }

    async deleteById(id) {
        return new Promise(async (resolve, reject) => {
            let array = await this.getAll()
            let objeto = array.find(x => x.id === parseInt(id))
            //se valida que el ojeto exista
            const index = array.indexOf(objeto);
            if (index > -1) {
                array.splice(index, 1)
                try {
                    await fs.promises.writeFile(`${this.rutaCompleta}`, JSON.stringify(array))
                    resolve('objeto eliminado')
                } catch (err) {
                    reject(err)
                }
            } else {
                resolve('no existe el objeto en el archivo')
            }
        })
    }

    async deleteByIdProducto(id, id_prod) {
        return new Promise(async (resolve, reject) => {
            let array = await this.getAll()

            let objeto = array.find(x => x.id === parseInt(id))
            //se valida que el ojeto exista
            const index = array.indexOf(objeto);
            if (index > -1) {

                let producto = array[index].carrito.find(x => x.id === parseInt(id_prod))
                const indexProducto = array[index].carrito.indexOf(producto);
                array[index].carrito.splice(indexProducto, 1)
                try {
                    await fs.promises.writeFile(`${this.rutaCompleta}`, JSON.stringify(array))
                    resolve('producto eliminado')
                } catch (err) {
                    reject(err)
                }
            } else {
                resolve('no existe el objeto en el archivo')
            }
        })
    }

}

export { ContenedorCarrito }