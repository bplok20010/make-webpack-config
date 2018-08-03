
const webpackDevServer = require('webpack-dev-server');
const { init } = require('./utils');
const webpack = require("webpack");
const omit = require('object.omit');
const opn = require("opn");

const options = {
    host: '127.0.0.1',
    clientLogLevel: 'none',
    hot: true,
    overlay: false,
    compress: true,
    port: 9000,
};

module.exports = async function (cfg = {}) {
    const devServer = cfg.devServer || {};

    cfg = omit(cfg, ['devServer', 'watch']);

    const webpackConfig = await init(cfg);

    const compiler = webpack(webpackConfig);

    const devServerOptions = Object.assign({}, options, devServer, {
        contentBase: webpackConfig.output.path,
    });

    const server = new webpackDevServer(compiler, devServerOptions);

    server.listen(devServerOptions.port, devServerOptions.host, () => {
        console.log('Starting server on http://%s:%d', devServerOptions.host, devServerOptions.port);
        opn(`http://${devServerOptions.host}:${devServerOptions.port}`);
    });

}