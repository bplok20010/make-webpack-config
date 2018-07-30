const path = require('path');
const paths = require('./paths');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = [
    new CleanWebpackPlugin(path.basename(paths.appDist), {
        root: paths.appPath
    }),

    new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
    }),

    new webpack.IgnorePlugin(/^\.[\\/]locale$/, /moment$/),
];