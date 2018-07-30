const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');
const fs = require('fs');

const plugins = [];

if( fs.existsSync(paths.appEntryHtml) ) {
    plugins.push(
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appEntryHtml,
        })
    );
}

module.exports = merge(common, {
    devtool: 'eval',
    plugins,
});