const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')

const { VueLoaderPlugin } = require('vue-loader')

const PostCssPlugins = [
    require('postcss-import'),
    require('precss'),
    require('autoprefixer')
]

config = {
    module: {
        rules: [{
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.(js)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.pug$/,
                oneOf: [
                    // this applies to `<template lang="pug">` in Vue components
                    {
                        resourceQuery: /^\?vue/,
                        use: ['pug-plain-loader']
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|ttf|woff2|woff)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /(\.html$|favicon)/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.(css|sss|postcss)$/,
                use: [{
                        loader: 'vue-style-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            parser: 'sugarss',
                            plugins: () => {
                                return PostCssPlugins
                            }
                        }
                    }
                ]
            }
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/'
    },
    externals: {
        vue: 'vue',
        dd: 'v-dd',
        hilite: 'vv-hilite',
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}

module.exports = [
    merge( config, {
        entry: path.join( __dirname, 'src/plugin.js' ),
        output: {
            filename: 'vv-table.min.js',
            libraryTarget: 'window',
            library: 'VVtable',
        }
    } ),
    merge( config, {
        entry: path.join( __dirname, 'src/vv-table.vue' ),
        output: {
            filename: 'vv-table.js',
            libraryTarget: 'umd',
            library: 'vv-table',
            umdNamedDefine: true
        }
    } )
]
