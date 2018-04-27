const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    devtool: 'inlinesourcemap',
    devServer: {
        contentBase: path.join(__dirname, "../dist"),
        compress: false,
        inline: true,
        port: 3001
    },
    mode: 'development'
})
