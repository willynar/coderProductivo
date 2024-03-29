import path from "path";
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config()
import os from 'os'
import parseArgs from 'minimist';
import { createTransport } from 'nodemailer';

// para  nginx y local
const __filename = fileURLToPath(import.meta.url);
// para babel 
// const __filename = process.argv[1];
const __dirname = path.dirname(__filename);
dotenv.config({
    path: path.resolve(__dirname, 'data.Config.env')
})

const trasporterEmail = createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: process.env.emailAdmin,
        pass: process.env.passEmailAdmin
    },
    secure: false,
    tls: {
        rejectUnauthorized: false
    }
});

export const options = {
    trasporterEmail:trasporterEmail,
    fileSystem: {
        pathProducts: process.env.pathProducts,
        pathChats: process.env.pathChats,
        pathCarts: process.env.pathCarts,
        pathLogins: process.env.pathLogins
    },
    firebase: {
        serviceKey: {},
        databaseUrl: ""
    },
    mariaDB: {
        //con que gestor de base de datos me voy a conectar
        client: "mysql",
        //toda la informacion de la base de datos para conectarnos
        connection: {
            host: process.env.host,
            user: process.env.user,
            password: process.env.password,
            database: process.env.database,
        }
    },
    sqliteDB: {
        //con que gestor de base de datos me voy a conectar
        client: "sqlite",
        //toda la informacion de la base de datos para conectarnos
        connection: {
            filename: path.join(__dirname, "../DB/ecommerce.sqlite")
        },
        useNullAsDefault: true
    },
    MongoDB: {
        Url: process.env.Url,
        UrlSession: process.env.UrlSession,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    infoApp: {
        arguments: '',
        path: process.execPath,
        pathApp: process.cwd(),
        SO: process.platform,
        processId: process.pid,
        nodeVersion: process.versions.node,
        memory: process.memoryUsage(),
        procesors: os.cpus().length
    },
    twilio: {
        twilioAdminPhone: process.env.phoneTwilio,
        accountId: process.env.sidTwilio,
        authToken: process.env.tokenTwilio,
        phoneTwilioWhatsapp: process.env.phoneTwilioWhatsapp
    },
    objArguments: parseArgs(process.argv.slice(2), {
        alias: {
            m: 'mode',
            p: 'port'
        },
        default: {
            mode: 'FORK',
            port: 80
        }
    })
}