const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')

const PostCssPlugins = [
    require('postcss-import'),
    require('precss'),
    require('autoprefixer')
]

module.exports = (env = {}) => {
    return {
        mode: env.production ? 'production' : 'development',
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
            path: path.join(__dirname, 'public'),
            publicPath: '/'
        },
        devServer: {
            historyApiFallback: true
        },
        devtool: env.production ? false : 'cheap-module-eval-source-map',
        plugins: [
            new webpack.DefinePlugin({
                PRODUCTION: JSON.stringify(env.production)
            }),
            new VueLoaderPlugin()
        ]
    }
}
