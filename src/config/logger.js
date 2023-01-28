import log4js from 'log4js'
import { envConfig } from './env.Config.js'

log4js.configure({
    appenders: {
        consola: { type: 'console' },
        //definimos la salida de datos> terminal, archivo, base de datos
        archivoErrores: { type: 'file', filename: './src/logs/error.txt' },
        // archivoWarn: { type: 'file', filename: './src/logs/warn.txt' },
        // archivoDebug: { type: 'file', filename: './src/logs/debug.txt' },
        loggerConsola: { type: 'logLevelFilter', appender: 'consola', level: 'info' },
        loggerErrores: { type: 'logLevelFilter', appender: 'consola', level: 'error' },
        loggerWarn: { type: 'logLevelFilter', appender: 'consola', level: 'warn' },
        loggerDebbug: { type: 'logLevelFilter', appender: 'consola', level: 'debug' },

    },
    categories: {
        default: { appenders: ['loggerConsola','loggerErrores','loggerWarn'], level: 'all' },
        produccion: { appenders: ['loggerErrores', 'loggerDebbug','loggerWarn'], level: 'all' },
    }
});

let logger = null;

if (envConfig.NODE_ENV === 'pro') {
    logger = log4js.getLogger('production')
} else {
    logger = log4js.getLogger()
}

export { logger }