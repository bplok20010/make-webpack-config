const path = require('path');
const babelConfig = require('./babel.config');
const util = require('../util');

module.exports = function (cfg) {
    const rules = [];
    const oneOf = [];

    const assestMedia = cfg.assest.media;

    if (cfg.module.eslint) {
        rules.push(
            {
                enforce: "pre",
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: require.resolve("eslint-loader"),
                options: {
                    baseConfig: require('./eslint.config.js'),
                    useEslintrc: false,
                    configFile: util.customESlintFileExists() ? util.resolveCustomESlintFile() : null,
                }
            }
        );
    }

    if (cfg.module.babel) {
        oneOf.push({
            test: /\.jsx?$/,
            exclude: [
                /node_modules[\\/]core-js/m, //解决$export错误，不应该再对core-js转码，不然出现循环依赖问题
                /node_modules[\\/]babel-runtime/m,
            ],
            use: [{
                loader: require.resolve('babel-loader'),
                options: babelConfig(cfg)
            }]
        });
    }

    if (cfg.module.css) {
        oneOf.push({
            test: /\.css$/,
            use: [
                require("mini-css-extract-plugin").loader,
                require.resolve('css-loader'),
                {
                    loader: require.resolve("postcss-loader"),
                    options: {
                        config: {
                            path: path.resolve(__dirname, './postcss.config.js')
                        }
                    }
                }
            ]
        });
    }
    if (cfg.module.less) {
        oneOf.push({
            test: /\.less$/,
            use: [
                require("mini-css-extract-plugin").loader,
                require.resolve('css-loader'),
                {
                    loader: require.resolve("postcss-loader"),
                    options: {
                        config: {
                            path: path.resolve(__dirname, './postcss.config.js')
                        }
                    }
                },
                require.resolve("less-loader")
            ]
        });
    }
    if (cfg.module.sass) {
        oneOf.push({
            test: /\.scss$/,
            use: [
                require("mini-css-extract-plugin").loader,
                require.resolve('css-loader'),
                {
                    loader: require.resolve("postcss-loader"),
                    options: {
                        config: {
                            path: path.resolve(__dirname, './postcss.config.js')
                        }
                    }
                },
                require.resolve("sass-loader")
            ]
        });
    }
    if (cfg.module.json5) {
        oneOf.push({
            test: /\.json5$/,
            loader: require.resolve('json5-loader')
        });
    }

    oneOf.push({
        test: assestMedia.regexp,
        use: [{
            loader: require.resolve('url-loader'),
            options: {
                limit: assestMedia.limit,
                name: assestMedia.output + '/' + assestMedia.name,
            }
        }]
    });

    oneOf.push({
        exclude: [
            /\.ejs$/,
            /\.jsx?$/,
            /\.css$/,
            /\.scss$/,
            /\.less$/,
            /\.json5?$/,
            /\.vue$/,
            assestMedia.regexp,
        ],
        loader: require.resolve('file-loader'),
        options: {
            name: assestMedia.output + '/' + assestMedia.name,
        }
    });
}