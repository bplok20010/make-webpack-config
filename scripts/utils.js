const { getDepsFromConfig, createWebpackConfig, normalizeConfig } = require('../lib');
const execSync = require('child_process').execSync;

function installDeps(deps) {
    console.log(deps.length + "个依赖安装中，请稍后...");
    console.log('');
    const ret = execSync(`npm install --save-dev ${deps.join(' ')}`);
    console.log(ret.toString());
    console.log('依赖安装完成.');
    console.log('');
}

function init(cfg = {}) {
    cfg = normalizeConfig(cfg);
    const deps = getDepsFromConfig(cfg);

    return new Promise((resolve, reject) => {
        if (deps.length) {
            installDeps(deps);
        }
        resolve(createWebpackConfig(cfg));
    });
}

module.exports = {
    init,
}