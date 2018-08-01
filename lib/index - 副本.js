const merge = require("webpack-merge");
const child_process = require('child_process');
const path = require('path');
const dependencies = require('./dependencies.config');
const config = require('./default.config');
const webpackConfig = require('./webpack.config');
const RPQueue = require('rp-queue');

/**
 * 检测依赖信息
 */
function checkDepsInstall(cfg) {
    const deps = new Set(dependencies.core);
    const pkg = require(path.resolve(cfg.appPath, cfg.appPackage));

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
/**
 * 获取未安装依赖
 */
function getDepsFromConfig(cfg) {
    const deps = new Set(dependencies.core);
    const pkg = require(path.resolve(cfg.appPath, cfg.appPackage));

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

module.exports = function (cfg = {}) {
    const opts = merge(config, cfg);

    const deps = checkDepsInstall(opts);

    const execTasks = [];


    console.log("检测%d依赖尚未安装, 开始安装...", deps.length);

    deps.forEach(dep => {
        execTasks.push(function () {
            const cmd = 'npm install --save ' + dep;
            console.log('%s', cmd);
            return new Promise((resolve, reject) => {
                child_process.exec(cmd, (err, stdout, stderr) => {
                    if (err) {
                        reject(err);
                        console.error(err);
                        console.log('fail: %s', cmd);
                        return;
                    }
                    //console.log(stdout);
                    console.log('success: %s', cmd);
                    resolve(resolve)
                });
            });
        });
    });


    RPQueue(execTasks, 1)
        .then(() => console.log('done'))

}