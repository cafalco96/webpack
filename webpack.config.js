const path = require('path');
const { webpack } = require('webpack');
/** @type {import('webpack').Configuration} */ 
//ese comentario arriba ayuda al autocompletado de la configuracion 

const HTmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TeserWebpackPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
    mode: 'production', // LE INDICO EL MODO EXPLICITAMENTE
    entry: './src/index.js', // el punto de entrada de mi aplicación
    output: { // Esta es la salida de mi bundle
        path: path.resolve(__dirname, 'dist'),
        // resolve lo que hace es darnos la ruta absoluta de el S.O hasta nuestro archivo
        // para no tener conflictos entre Linux, Windows, etc
        filename: '[name].[contenthash].js', 
        // EL NOMBRE DEL ARCHIVO FINAL,
        // assetModuleFilename: 'assets/images/[hash][ext][query]', //dejar las imagenes en carpeta especifica 
    },
    resolve: {
        extensions: ['.js'], // LOS ARCHIVOS QUE WEBPACK VA A LEER
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@': path.resolve(__dirname, 'src/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
        }, //
    },
    module: {
        // REGLAS PARA TRABAJAR CON WEBPACK
        rules : [
            {
                test: /\.m?js$/, // LEE LOS ARCHIVOS CON EXTENSION .JS,
                exclude: /node_modules/, // IGNORA LOS MODULOS DE LA CARPETA
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css|.styl$/i, // LEE LOS ARCHIVOS
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i, // LEE LOS ARCHIVOS
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[hash][ext][query]',
                  }, //otro modo de mandar a carpeta dist
            },
            {
                // test: /\.(woof|woof2)$/,
                // use: {
                //     loader: 'url-loader',
                //     options: {
                //         limit: 10000, // O LE PASAMOS UN BOOLEANOS TRUE O FALSE
                //         // Habilita o deshabilita la transformación de archivos en base64.
                //        mimetype: 'aplication/font-woff',
                //        // Especifica el tipo MIME con el que se alineará el archivo. 
                //        // Los MIME Types (Multipurpose Internet Mail Extensions)
                //        // son la manera standard de mandar contenido a través de la red.
                //        name: "[name].[ext]",
                //        // EL NOMBRE INICIAL DEL ARCHIVO + SU EXTENSIÓN
                //        // PUEDES AGREGARLE [name]hola.[ext] y el output del archivo seria 
                //        // ubuntu-regularhola.woff
                //        outputPath: 'assets/fonts/', 
                //        // EL DIRECTORIO DE SALIDA 
                //        publicPath: 'assets/fonts/',
                //        // EL DIRECTORIO PUBLICO 
                //       esModule: false 
                //        // AVISAR EXPLICITAMENTE SI ES UN MODULO
                // }
                // }
                test: /\.(woff|woff2)$/,
                type: "asset/resource",
                generator: {
                filename: "assets/fonts/[name][contenthash][ext]"
        }
            }
        ]
    },
    plugins: [ //añade nuevos plugins para trabajar
      new HTmlWebpackPlugin({ //nuevo plugin traido 
        inject: true,
        template: './public/index.html',  //de donde viene 
        filename: 'index.html', //archivo destino
      }),
      new MiniCssExtractPlugin({
        filename: 'assets/[name].[contenthash].css',
      }),
      new CopyWebpackPlugin({
        patterns:[{
            from: path.resolve(__dirname, 'src', 'assets/images'),
            to: 'assets/images'
        }]
      }),
      new Dotenv(),
      new CleanWebpackPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TeserWebpackPlugin()
        ]
    }
}