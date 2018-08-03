const { init } = require('./utils');
const webpack = require("webpack");
const omit = require('object.omit');

module.exports = async function (cfg = {}) {
    cfg.mode = 'development';
    const watch = cfg.watch || true;

    cfg = omit(cfg, ['devServer', 'watch']);

    const webpackConfig = await init(cfg);
    const compiler = webpack(webpackConfig);

    const compilerCb = function (err, stats) {
        if (err) {
            return console.log(err);
        }

        console.log(stats.toString({
            chunks: false,
            colors: true,
        }));
    }
    if (watch) {
        compiler.watch({
            aggregateTimeout: 300,
            poll: undefined
        }, compilerCb);
    } else {
        compiler.run(compilerCb);
    }

}