import twilio from 'twilio'
import { logger } from '../config/logger.js';

class ContenedorWhatsapp {
    constructor(model) {
        this.model = model;
        this.twilioClient = twilio(this.model.accountId, this.model.authToken);
    }

    async enviarWhatsappCompra(carrito, usuario) {
        let textoMensaje = `Los siguientes productos fueron solicitados: \n`;
        let total = 0;
        carrito.forEach(element => {
            textoMensaje += `producto solicitado ${element.nombre}. precio: ${element.precio} descripcion: ${element.descripcion} \n`;
            total += element.precio;
        });
        textoMensaje += `Total: ${total} \n`

        this.twilioClient.messages.create({
            body: textoMensaje,
            from: `whatsapp:${this.model.phoneTwilioWhatsapp}`,
            to: `whatsapp:${usuario.phone}`
        }, (error, response) => {
            if (error) {
                logger.error(error)
            } else {
                logger.info('mensaje enviado correctamente')

            }
        })
    }

}

export { ContenedorWhatsapp }
