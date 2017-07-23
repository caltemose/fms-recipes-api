const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: {
        recipe: './src/js/pages/recipe.js',
        home: './src/js/pages/home.js'
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
