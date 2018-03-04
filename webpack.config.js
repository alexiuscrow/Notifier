'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
    src: path.resolve(__dirname, 'src'),
    dist: path.resolve(__dirname, 'dist')
};

module.exports = {
    context: paths.src,
    entry: {
        app: "./app"
    },
    output: {
        path: paths.dist,
        filename: "[name].js",
        library: "[name]"
    },
    watch: true,
    devtool: 'source-map',
    resolve: {
        modules: [paths.src, 'node_modules'],
        extensions: ['.js', '.jsx', '.scss' ,'.css']
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                include: paths.src,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                })
            },
            {
                test: /\.(js|jsx?)$/,
                include: paths.src,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/react'],
                        plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-object-rest-spread']
                    }
                }
            },
            {
                test: /\.html$/,
                include: paths.src,
                use: ['html-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
                include: paths.src,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([paths.dist]),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new ExtractTextPlugin('styles.css', {allChunks: true}),
        // new webpack.optimize.CommonsChunkPlugin({ name: 'common' }),
        // new webpack.optimize.UglifyJsPlugin()
    ]
};
