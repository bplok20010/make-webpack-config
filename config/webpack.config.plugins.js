const path = require('path');
const webpack = require('webpack');

module.exports = function (cfg) {
    const plugins = [
        new webpack.IgnorePlugin(...cfg.IgnorePlugin)
    ];

    if (cfg.clean.enable) {
        const CleanWebpackPlugin = require('clean-webpack-plugin');
        plugins.push(
            new CleanWebpackPlugin(path.basename(cfg.appDist), {
                root: cfg.appPath
            })
        );
    }

    if (cfg.module.css || cfg.module.less || cfg.module.sass) {
        const MiniCssExtractPlugin = require("mini-css-extract-plugin");
        plugins.push(
            new MiniCssExtractPlugin({
                filename: cfg.assest.css.output + '/' + cfg.assest.css.name
            })
        );
    }

    return plugins;
}
