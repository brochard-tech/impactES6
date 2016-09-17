var path    = require('path');
var webpack = require('webpack');

module.exports = {

    // Entry file JS
    entry: './index.js',

    // File minified
    output: {
        path: __dirname,
        filename: 'game.min.js'
    },

    // Set shorcut to js files
    resolve: {
        root: path.resolve(__dirname),
        alias: {
            ig: 'lib/impactES6'
        },
        extensions: ['', '.js']
    },

    plugins: [
        // Create global variables
        new webpack.ProvidePlugin({
            ig: 'ig',
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ],

    module: {
        // Babel ES6 Loader
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};