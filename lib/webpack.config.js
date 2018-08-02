const path = require('path');
const webpackModule = require('./webpack.config.module');
const webpackPlugins = require('./webpack.config.plugins');
const webpackOptimization = require('./webpack.config.optimization');

module.exports = function (cfg) {
    const assestJs = cfg.assest.js;
    const entryJs = !Array.isArray(cfg.appEntryJs) ? [cfg.appEntryJs] : cfg.appEntryJs;
    process.env.NODE_ENV = cfg.mode;
    const options = {
        mode: cfg.mode,
        optimization: {
            nodeEnv: cfg.mode
        },
        devtool: cfg.devtool, //测试环境用eval 提高编译速度 //"source-map",
        entry: {
            app: [].concat(cfg.appPolyfills, entryJs.map(entry => path.resolve(cfg.appPath, cfg.appSrc, entry))),
        },
        output: {
            path: path.resolve(cfg.appPath, cfg.appDist),
            filename: path.join(assestJs.output, assestJs.name),
            chunkFilename: path.join(assestJs.output, assestJs.chunkName),
            publicPath: cfg.publicUrl,
        },
        module: webpackModule(cfg),
        plugins: webpackPlugins(cfg),
        optimization: webpackOptimization(cfg),
        state: {
            colors: true,
        }
    };

    options.devServer = Object.assign({
        compress: true,
        port: 9000
    }, cfg.devServer, {
            contentBase: path.resolve(cfg.appPath, cfg.appDist),
        });

    return options;
}