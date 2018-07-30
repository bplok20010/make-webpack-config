const path = require('path');
const webpackModule = require('./webpack.config.module');
const webpackPlugins = require('./webpack.config.plugins');
const webpackOptimization = require('./webpack.config.optimization');

module.exports = function (cfg) {
    const assestJs = cfg.assest.js;
    return {
        mode: process.env.NODE_ENV,
        optimization: {
            nodeEnv: process.env.NODE_ENV
        },
        devtool: cfg.devtool, //测试环境用eval 提高编译速度 //"source-map",
        entry: {
            app: [].concat(cfg.appPolyfills, cfg.appEntryJs),
        },
        output: {
            path: cfg.appDist,
            filename: path.join(assestJs.output, assestJs.name),
            chunkFilename: path.join(assestJs.output, assestJs.chunkName),
            publicPath: cfg.publicUrl,
        },
        module: webpackModule(cfg),
        plugins: webpackPlugins(cfg),
        optimization: webpackOptimization(cfg)
    };
}