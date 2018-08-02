const Webpack = require('webpack');
const path = require('path')
const WebpackDevServer = require('webpack-dev-server');
const { getDepsFromConfig, createWebpackConfig } = require('../lib');

const cfg = {
    mode: "development",
    cleanDist: true,
    watch: true,
    appPath: path.resolve(process.cwd(), 'test'),
    module: {
        less: false,
        sass: true,
        vue: true,
    }
};

const webpackConfig = createWebpackConfig(cfg);

const compiler = Webpack(webpackConfig);
const devServerOptions = Object.assign({}, webpackConfig.devServer, {
    stats: {
        colors: true
    }
});
const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(8080, '127.0.0.1', () => {
    console.log('Starting server on http://localhost:8080');
});