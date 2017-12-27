const webpack = require('webpack')
const path = require('path')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    entry: {
        collection: './src/js/pages/collection.js',
        recipe: './src/js/pages/recipe.js',
        home: './src/js/pages/home.js',
        global: './src/js/pages/global.js'
    },
    externals: {
        awesomplete: 'Awesomplete'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, './public/js/'),
        filename: '[name].js'
    }
}
//, plugins: [new BundleAnalyzerPlugin()]
