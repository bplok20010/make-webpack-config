const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = function (cfg) {
    const plugins = [
        new webpack.IgnorePlugin(...cfg.IgnorePlugin)
    ];
    //开启manifest模式
    if (cfg.manifest.enableMode === process.env.NODE_ENV) {
        plugins.push(new ManifestPlugin());
    }
    //打包前清理文件夹
    if (cfg.clean.enable) {
        const CleanWebpackPlugin = require('clean-webpack-plugin');
        plugins.push(
            new CleanWebpackPlugin(path.basename(cfg.appDist), {
                root: cfg.appPath
            })
        );
    }
    //打包合并css成文件
    if (cfg.module.css || cfg.module.less || cfg.module.sass) {
        const MiniCssExtractPlugin = require("mini-css-extract-plugin");
        plugins.push(
            new MiniCssExtractPlugin({
                filename: cfg.assest.css.output + '/' + cfg.assest.css.name
            })
        );
    }
    //生成首页html
    if (fs.existsSync(cfg.appEntryHtml)) {
        const htmlOpts = {
            inject: true,
            template: cfg.appEntryHtml,
        };

        if (process.env.NODE_ENV === 'production') {
            htmlOpts.minify = {
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
            }
        }

        plugins.push(
            new HtmlWebpackPlugin(htmlOpts)
        );
    }

    return plugins;
}
