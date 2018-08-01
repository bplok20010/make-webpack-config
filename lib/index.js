const merge = require("webpack-merge");
const path = require('path');
const fs = require("fs");
const dependencies = require('./dependencies.config');
const config = require('./default.config');
const webpackConfig = require('./webpack.config');

/**
 * 获取未安装依赖
 */
function getDepsFromConfig(cfg) {
    const deps = new Set(dependencies.core);
    const pkgFile = process.cwd() + '/package.json';
    let pkg = {};
    if (fs.existsSync(pkgFile)) {
        pkg = require(pkgFile);
    }

    const pkgDeps = Object.assign({}, pkg.dependencies, pkg.devDependencies);

    Object.keys(cfg.module).filter(v => v).forEach(v => {
        if (dependencies[v]) {
            dependencies[v].forEach(dep => {
                deps.add(dep);
            });
        }
    });

    return [...deps].filter(v => !(v in pkgDeps));
}

function createWebpackConfig(cfg) {
    return webpackConfig(merge(config, cfg));
}

module.exports = {
    getDepsFromConfig,
    createWebpackConfig
};
