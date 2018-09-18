const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Directories
const srcPath = path.resolve(__dirname, '../src/');
const outputPath = path.resolve(__dirname, '../build');

module.exports = {
    entry: [
        'babel-polyfill',
        './src/index.js',
    ],
    output: {
        path: outputPath,
    },
    devServer: {
        host: 'localhost',
        port: 3000,
    },
    watch: true,
    devtool: 'eval-source-map',
    module: {
        loaders: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        modules: ['node_modules', 'src'],
        alias: {
            src: srcPath,
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: 'body',
        }),
        new webpack.ProvidePlugin({
            React: 'react',
        }),
        new webpack.EnvironmentPlugin(['NODE_ENV']),
    ],
};
