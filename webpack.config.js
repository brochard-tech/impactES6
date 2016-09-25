var path    = require('path');
var webpack = require('webpack');

module.exports = {
    // Entry file JS
    entry: {
        game        : './index.js',
        example     : './example.js'
    },

    // File minified
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].min.js'
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
                loader: 'imports?this=>window',
                exclude: '/node_modules/'
            },

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