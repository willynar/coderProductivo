import { logger } from '../../config/logger.js'
import { createTransport } from 'nodeMailer';
const trasporterEmail = createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: "wjnaranjo@misena.edu.co",
        pass: "uaxyruvrmigfwhpr"
    },
    secure: false,
    tls: {
        rejectUnauthorized: false
    }
});

class ContenedorEmail {
    constructor() {
    }
    async enviarCorreoRegistro(objetonuevo) {
        trasporterEmail.sendMail({
            from: "Server admin",
            to: "wjnaranjo@misena.edu.co",
            subject: "Nuevo registro",
            text: `El usuario ${objetonuevo.username} se registro exitosamente`,

        }, (error, response) => {
            if (error) {
                logger.error(error)
            } else {
                logger.info('mensaje enviado correctamente')

            }
        })
    }

    async enviarCorreoCompraCarrito(carrito, usuario) {
        let textoMensaje = `Los siguientes productos fueron solicitados: \n`;
        let total = 0;
        carrito.forEach(element => {
            textoMensaje += `producto solicitado ${element.nombre}. precio: ${element.precio} descripcion: ${element.descripcion} \n`;
            total += element.precio;
        });
        textoMensaje += `Total: ${total} \n`

        trasporterEmail.sendMail({
            from: "Server admin",
            to: usuario.username,
            subject: `Nuevo depido de: ${usuario.name}, ${usuario.username}`,
            text: textoMensaje,

        }, (error, response) => {
            if (error) {
                logger.error(error)
            } else {
                logger.info('mensaje enviado correctamente')

            }
        })
    }

}

export { ContenedorEmail }