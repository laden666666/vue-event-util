'use strict'
const path = require('path')
const webpack = require('webpack')
const utils = require('./utils')
const vueLoaderConfig = require('./vue-loader.conf')
const _package = require('../package.json')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    context: path.resolve(__dirname, '../'),
    resolve: {
        extensions: ['.js', '.ts', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.ts(x?)$/,
                include: [path.join(__dirname, '../src'), path.join(__dirname, '../test/unit/specs/')],
                use: [{
                    loader: 'ts-loader',
                }]
            },
        ]
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    plugins: [
        new webpack.DefinePlugin({
            PLUGIN_VERSION: '"v' + _package.version + '"'
        }),
    ]
}
