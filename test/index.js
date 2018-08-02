const { getDepsFromConfig, createWebpackConfig } = require('../lib');
const webpack = require('webpack');
const path = require('path');

const cfg = {
    mode: "development",
    cleanDist: true,
    watch: true,
    devServer: true,
    appPath: path.resolve(process.cwd(), 'test'),
    module: {
        less: false,
        sass: true,
        vue: true,
    }
};

const deps = getDepsFromConfig(cfg);

if (deps.length) {
    console.log('依赖尚未安装: %s', deps.join(' '));
} else {
    const webpackCfg = createWebpackConfig(cfg);

    const compiler = webpack(webpackCfg);

    compiler.run((err, stats) => {
        if (err) {
            return console.log(err);
        }

        const info = stats.toJson();

        if (stats.hasErrors()) {
            return console.log(new Error(info.errors));
        }

        console.log(info.warnings);
    });
}