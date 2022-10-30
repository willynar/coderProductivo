import fs from 'fs';
class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo
        this.extencion = '.txt'
        this.ruta = "./src/persistance/"
        this.rutaCompleta = `${this.ruta}${this.nombreArchivo}${this.extencion}`
        fs.createWriteStream(`${this.rutaCompleta}`, 'utf-8')
    }

    async save(objet) {
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
                        if (x.id == id) {
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
            return { error: 'producto no encontrado' }
            // return null
        } else {
            return objet
        }
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


    async updateById(objectUpd) {
        let objet
        return new Promise(async (resolve, reject) => {
            let array = await this.getAll()
            console.log(array)
            console.log(objectUpd)
            let objeto = array.find(x => x.id === objectUpd.id)
            //se valida que el ojeto exista
            const index = array.indexOf(objeto);
            if (index > -1) {
                array[index].nombre = objectUpd.nombre
                array[index].precio = objectUpd.precio
                array[index].timestamp = objectUpd.timestamp
                array[index].descripcion = objectUpd.descripcion
                array[index].codigo = objectUpd.codigo
                array[index].stock = objectUpd.stock
                array[index].foto = objectUpd.foto
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

    async deleteById(id) {
        return new Promise(async (resolve, reject) => {
            let array = await this.getAll()
            let objeto = array.find(x => x.id === id)
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

    async deleteAll() {
        return new Promise(async (resolve, reject) => {
            try {
                await fs.promises.writeFile(`${this.rutaCompleta}`, '')
                resolve('objetos eliminados')
            } catch (err) {
                reject(err)
            }
        })
    }

}

export default Contenedor