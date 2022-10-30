import path from 'path';

module.exports = {
    //nodo
    mode: "production",
    //archivo a tranpila
    entry: "./src/index.js",
    //donde ejecutar el codigo
    target: 'node',
    //
    output: {
        //directorio
        path: path.join(__dirname, 'dist'),
        //archivo empaquetado
        filename: 'index.js'
    },
    //
    resolve: {
        extensions: ['.js', '.hbs', '.html']
    },
    //loaders
    module: {
        rules: [
            {
                test: /.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', "es2015", "es2016"],
                    }
                }
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
                options: {
                    knownHelpersOnly: false,
                    inlineRequires: /\/assets\/(:?images|audio|video)\//ig,
                    helperDirs: [path.join(__dirname, '/lib/hbs-helpers')],
                    partialDirs: [path.join(PATHS.TEMPLATES, 'partials')],
                },
                exclude: /node_modules/
            },
            {
                test: /\.html$/i,
                exclude: /node_modules/,
                use: 'ts-loader'
            }

        ]
    }
}
