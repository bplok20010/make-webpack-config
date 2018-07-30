const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const paths = require('./paths');
const fs = require('fs');

const plugins = [
    new ManifestPlugin(),
];

if( fs.existsSync(paths.appEntryHtml) ) {
    plugins.push(
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appEntryHtml,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },    
        })
    );
}

module.exports = merge(common, {
    devtool: 'source-map',
    plugins
});