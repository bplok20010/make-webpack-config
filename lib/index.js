const merge = require("webpack-merge");
const path = require('path');
const fs = require("fs");
const dependencies = require('./dependencies.config');
const config = require('./default.config');
const webpackConfig = require('./webpack.config');

function normalizeConfig(cfg = {}) {
    return merge(config, cfg);
}

/**
 * 获取未安装依赖
 */
function getDepsFromConfig(cfg) {

    if (!cfg.__init__) {
        cfg = normalizeConfig(cfg);
    }

    const deps = new Set(dependencies.core);
    const pkgFile = process.cwd() + '/package.json';
    let pkg = {};
    if (fs.existsSync(pkgFile)) {
        pkg = require(pkgFile);
    }

    const pkgDeps = Object.assign({}, pkg.dependencies, pkg.devDependencies);

    Object.keys(cfg.module).filter(v => cfg.module[v]).forEach(v => {
        if (dependencies[v]) {
            dependencies[v].forEach(dep => {
                deps.add(dep);
            });
        }
    });

    return [...deps].filter(v => !(v in pkgDeps));
}

function createWebpackConfig(cfg) {
    if (!cfg.__init__) {
        cfg = normalizeConfig(cfg);
    }
    return webpackConfig(cfg);
}

module.exports = {
    normalizeConfig,
    getDepsFromConfig,
    createWebpackConfig
};
